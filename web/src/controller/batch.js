import { get, getMany, setMany, update, entries } from 'idb-keyval'
import { cache } from 'src/shared/cache'
import { db } from 'src/shared/db'
import { CREATE_BATCH } from 'src/shared/queries'

// I'm going to make my life easier and not interact much with batch creation until I go deeper into the design
// so for now, all this does is update the caches in one function, and update the ids in another

export const createBatch = async (course, client, userId) => {
	await createBatchWeb(course)
	await createBatchDB(course) // we await so that the API doesn't prematurely retrieve and sync ids before the client database is set up
	await createBatchAPI(course, client, userId)
	return null
}

export const createBatchWeb = async (course) => {
	cache.create('course-dropdown', [])
	cache.push('course-dropdown', {
		value: course.localId,
		title: course.title ? course.title : 'Untitled',
	})

	cache.create(`${course.localId}-stats`, {
		words: 0,
		lessons: course.lesson.length,
	})

	cache.create('course-cards', [])
	cache.push('course-cards', {
		id: course.localId,
		title: course.title,
		description: course.description,
		questionCount: 0,
		notebookWords: 0,
		lessonCount: course.lesson.length,
		mark: 0,
	})

	cache.create(`course-${course.localId}`, {
		id: course.localId,
		title: course.title,
		lessons: course.lesson.map((lesson, i) => {
			const links = course.link.filter(
				(link) => link.lessonId === lesson.localId
			)
			const sections = links
				.filter((link) => link.type == 'section')
				.map((link) => {
					return course.section.find(
						(section) => section.localId == link.materialId
					)
				})
			const articles = links
				.filter((link) => link.type == 'article')
				.map((link) =>
					course.material.find(
						(material) => (material.localId == link.materialId)
					)
				)

			return {
				id: lesson.localId,
				index: i,
				title: lesson.title,
				questionCount: 0,
				lessonCount: 0,
				sections: sections.map((section) => {
					return {
						title: section.title,
						start: section.start,
						end: section.end,
					}
				}),
				articles: articles.map((article) => {
					return { title: article.title, pages: article.pages }
				}),
			}
		}),
	})
}

export const createBatchDB = async (course) => {
	db.push('course', {
		title: course.title,
		id: course.localId,
		description: course.description,
	})

	cache.create('id-map', [])
	cache.push('id-map', course.localId)

	for (const lesson of course.lesson) {
		db.push('lesson', {
			id: lesson.localId,
			courseId: course.localId,
			index: lesson.index,
			title: lesson.title,
		})
		cache.push('id-map', lesson.localId)
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
		cache.push('id-map', material.localId)
	}

	for (const page of course.page) {
		db.push('notebookPage', {
			id: page.localId,
			lessonId: page.lessonId,
			content: page.content,
			index: page.index,
			lessonTitle: page.lessonTitle
		})
	}

	for (const link of course.link) {
		let payload = {
			id: link.localId,
			lessonId: link.lessonId,
		}

		payload[payload.type == 'article' ? 'articleId' : 'sectionId'] =
			link.materialId
		db.push(`${link.type}OnLesson`, payload)
		cache.push('id-map', link.localId)
	}

	for (const section of course.section) {
		db.push('section', {
			id: section.localId,
			textbookId: section.textbookId,
			title: section.title,
			start: section.start,
			end: section.end,
		})
		cache.push('id-map', section.localId)
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

	response = await client.mutate({
		mutation: CREATE_BATCH,
		variables: {
			userId: userId,
			input: input,
		},
	})

	const data = response.data.createBatchCourse

	// make sure all ids are synced before we get the textbook ids
	await syncIds(data.record)

	for (item of data.uploaded) {
		// get file from the passed course object using the localid we have to get again from the record -.-
		const local = data.record.find((item) => item.real == item.id).localId
		const file = course.material.find((item) => item.localId == local).file
		uploadTextbook(file, item.presigned)
		// update url
		db.updateVal(data.type, item.materialId, 'url', item.url)
	}
	return null
}

const syncIds = async (record) => {
	let entries = await entries()
	for (let entry of entries) {
		entry[1].forEach((item) => {
			item.id = record.find((blah) => blah.local == item.id).real
			if (item.lessonId)
				item.lessonId = record.find((blah) => blah.local == item.lessonId).real
			if (item.textbookId)
				item.textbookId= record.find((blah) => blah.local == item.textbookId).real
			if (item.sectionId)
				item.sectionId= record.find((blah) => blah.local == item.sectionId).real
			if (item.courseId)
				item.courseId= record.find((blah) => blah.local == item.courseId).real
			if (item.testId)
				item.testId = record.find((blah) => blah.local == item.testId).real
		})
	}
	setMany(entries)
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
	})
}
