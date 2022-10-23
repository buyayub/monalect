import { get, set, setMany, update, entries} from 'idb-keyval'

const push = (key, item) => {
	update(key, (val) => [...val, item])
}

const create = async (key, arr=[]) => {
	try {
		await set(key, arr)
		return true
	}
	catch (err) {
		return false
	}
}

const remove = (key, prop, value) => {
	update(key, (data) => data.filter((item) => item[prop] !== value))
}

const find = async (key, id) => {
	const data = get(key)
	return data.find((item) => item.id == id)
}

const findMany = async (key, obj) => {
	const data = get(key)
	const prop = obj.getOwnPropertyNames()[0]

	return data.filter((item) => item[prop] == obj[prop])
}

const updateVal = (key, id, name, value) => {
	update(key, (data) =>
		data.map((item) => {
			if (item.id == id) {
				item[name] = value
			}
			return item
		})
	)
}

const syncId = async (record) => {
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
	setMany(data)
}


export const db = {
	create: create,
	push: push,
	remove: remove,
	find: find,
	findMany: findMany,
	updateVal: updateVal,
	syncId: syncId,
}
