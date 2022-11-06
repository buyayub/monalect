import { get, getMany, setMany, update, entries } from 'idb-keyval'
import { cache } from 'src/lib/cache'
import { db } from 'src/lib/db'
import { CREATE_BATCH } from 'src/queries'

// I'm going to make my life easier and not interact much with batch creation until I go deeper into the design

const tempIds = 'id-record'

export const createBatch = async (course, client, userId) => {
	await createBatchWeb(course)
	await createBatchDB(course) // we await so that the API doesn't prematurely retrieve and sync ids before the client database and cache is set up
	await createBatchAPI(course, client, userId)
	return null
}

export const createBatchWeb = async (course) => {
	cache.create('dropdown', [])
	cache.push('dropdown', {
		value: course.localId,
		title: course.title ? course.title : 'Untitled',
	})

	cache.create(`${course.localId}-stats`, {
		words: 0,
		lessons: course.lesson.length,
	})

	cache.create('course', [])
	cache.push('course', {
		id: course.localId,
		title: course.title,
		description: course.description,
		questionCount: 0,
		notebookWords: 0,
		lessonCount: course.lesson.length,
		mark: 0,
	})

	const courseKey = `course-${course.localId}`
	cache.create(
		courseKey + '-lesson',
		course.lesson.map((lesson, i) => {
			return {
				id: lesson.localId,
				index: i,
				title: lesson.title,
				questionCount: 0,
				lessonCount: 0,
			}
		})
	)

	cache.create(
		courseKey + '-article',
		course.material
			.filter((material) => material.type == 'article')
			.map((material) => {
				return {
					type: material.type,
					id: material.localId,
					courseId: course.localId,
					title: material.title,
					doi: material.identifier,
					author: material.author,
					uploaded: material.uploaded,
					pageOffset: material.offset,
					url: null,
				}
			})
	)

	cache.create(
		courseKey + '-textbook',
		course.material
			.filter((material) => material.type == 'article')
			.map((material) => {
				return {
					type: material.type,
					id: material.localId,
					courseId: course.localId,
					title: material.title,
					isbn: material.identifier,
					author: material.author,
					uploaded: material.uploaded,
					pageOffset: material.offset,
					url: null,
				}
			})
	)

	cache.create(
		courseKey + '-textbookSection',
		course.section.map((section) => {
			return {
				id: section.localId,
				textbookId: section.textbookId,
				title: section.title,
				start: section.start,
				end: section.end,
			}
		})
	)

	cache.create(
		courseKey + '-notebookPage',
		course.section.map((section) => {
			return {
				id: page.localId,
				lessonId: page.lessonId,
				content: page.content,
				index: page.index,
				lessonTitle: page.lessonTitle,
			}
		})
	)
}

export const createBatchDB = async (course) => {
	db.push('course', {
		title: course.title,
		id: course.localId,
		description: course.description,
	})
	cache.collection.push(tempIds, { id: course.localId, real: null} )

	for (const lesson of course.lesson) {
		db.push('lesson', {
			id: lesson.localId,
			courseId: course.localId,
			index: lesson.index,
			title: lesson.title,
		})
		cache.collection.push(tempIds, { id: lesson.localId, real: null} )
	}

	for (const material of course.material) {
		let payload = {
			type: material.type,
			id: material.localId,
			courseId: course.localId,
			title: material.title,
			author: material.author,
			uploaded: material.uploaded,
			pageOffset: material.offset,
			url: null,
		}

		payload[material.type == 'article' ? 'doi' : 'isbn'] = material.identifier
		db.push(material.type, payload)
		cache.collection.push(tempIds, { id: material.localId, real: null} )
	}

	for (const page of course.page) {
		console.log(page)
		db.push('notebookPage', {
			id: page.localId,
			lessonId: page.lessonId,
			content: page.content,
			index: page.index,
			lessonTitle: page.lessonTitle,
		})
		cache.collection.push(tempIds, { id: page.localId, real: null} )
	}

	for (const link of course.link) {
		let payload = {
			id: link.localId,
			lessonId: link.lessonId,
		}

		payload[payload.type == 'article' ? 'articleId' : 'sectionId'] =
			link.materialId
		db.push(`${link.type}OnLesson`, payload)
		cache.collection.push(tempIds, { id: link.localId, real: null} )
	}

	for (const section of course.section) {
		db.push('textbookSection', {
			id: section.localId,
			textbookId: section.textbookId,
			title: section.title,
			start: section.start,
			end: section.end,
		})
		cache.collection.push(tempIds, { id: section.localId, real: null} )
	}
}

export const createBatchAPI = async (course, client, userId) => {
	let input = JSON.parse(JSON.stringify(course))

	// some pre-mutation modifications
	input.lesson.forEach((lesson, i) => (lesson.index = i))
	input.link.forEach((link) => delete link.title)
	input.page.forEach((page) => {
		delete page.content
		delete page.index
		delete page.lessonTitle
	})
	input.material.forEach((material) => delete material.file)

	const response = await client.mutate({
		mutation: CREATE_BATCH,
		variables: {
			userId: userId,
			input: input,
		},
	})

	const data = response.data.createBatchCourse
	console.log(data)

	let newRecord = data.record
	newRecord.forEach((entry) => {
		entry.id = entry.real
		delete entry.real
	})

	for (const entry of newRecord) {
		cache.collection.update(tempIds, entry.id, 'real', entry.real)
	}

	for (const item of data.uploaded) {
		// get file from the passed course object using the localid we have to get again from the record -.-
		let local = data.record.find((record) => {
			return (
				(record.type == 'article' || record.type == 'textbook') &&
				record.real == item.materialId
			)
		}).local
		const file = course.material.find((item) => item.localId == local).file
		uploadTextbook(file, item.presigned)
		// update url
		db.update(item.type, item.materialId, { url: item.url })
		db.update(item.type, item.materialId, { presigned: item.presigned })
		let expiry = new Date()
		expiry.setDate(expiry.getDate() + 2)
		db.update(item.type, item.materialId, { presignedExpiry: expiry.getTime() })
	}
	return null
}

const syncIdDB = async (record) => {
	let data = await entries()
	console.log('Before: ', { data })
	for (let entry of data) {
		entry[1].forEach((item) => {
			let id = undefined
			if (item.id) {
				id = record.find((blah) => blah.local == item.id)
				if (id) item.id = id.real
			}
			if (item.lessonId) {
				id = record.find((blah) => blah.local == item.lessonId)
				if (id) item.lessonId = id.real
			}
			if (item.textbookId) {
				id = record.find((blah) => blah.local == item.textbookId)
				if (id) item.textbookId = id.real
			}
			if (item.sectionId) {
				id = record.find((blah) => blah.local == item.sectionId)
				if (id) item.sectionId = id.real
			}
			if (item.courseId) {
				id = record.find((blah) => blah.local == item.courseId)
				if (id) item.courseId = id.real
			}
			if (item.testId) {
				id = record.find((blah) => blah.local == item.testId)
				if (id) item.testId = id.real
			}
			// I know it's bad but I'm brain-fogged right now, and I don't want to think
		})
	}
	console.log({ record })
	console.log('After: ', { data })
	setMany(data).then(() => cache.update('id-map', []))
}

const syncIdCache = async (record, courseId) => {
	cache.apply('course-cards', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = record.find((item) => item.local == entry.id)
			if (unique) entry.id = unique.real
			return entry
		})
		return val
	})

	cache.apply('course-dropdown', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = record.find((item) => item.local == entry.id)
			if (unique) entry.value = unique.real
			return entry
		})
		return val
	})

	const iterate = (obj, func) => {
		for (let item in obj) {
			if (typeof item == 'object') {
				iterate(item, func)
			} else if (func) {
				func(item)
			}
		}
	}

	let courseEntry = cache.get(`course-${courseId}`)
	iterate(courseEntry, (item) => {
		let id = undefined
		if (item.id) {
			id = record.find((blah) => blah.local == item.id)
			if (id) item.id = id.real
		}
		if (item.lessonId) {
			id = record.find((blah) => blah.local == item.lessonId)
			if (id) item.lessonId = id.real
		}
		if (item.textbookId) {
			id = record.find((blah) => blah.local == item.textbookId)
			if (id) item.textbookId = id.real
		}
		if (item.sectionId) {
			id = record.find((blah) => blah.local == item.sectionId)
			if (id) item.sectionId = id.real
		}
		if (item.courseId) {
			id = record.find((blah) => blah.local == item.courseId)
			if (id) item.courseId = id.real
		}
		if (item.testId) {
			id = record.find((blah) => blah.local == item.testId)
			if (id) item.testId = id.real
		}
		return item
	})
	console.log(courseEntry)
	cache.remove(`course-${courseId}`)
	cache.create(`course-${courseEntry.id}`, courseEntry)
}

const uploadTextbook = async (file, url) => {
	var data = new FormData()
	data.append('file', file)
	fetch(url, {
		mode: 'cors',
		method: 'PUT',
		headers: {
			'Content-Type': 'application/pdf',
		},
		body: data,
	}).then((response) => console.info(response))
}
