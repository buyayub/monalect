import { get, set, setMany, update as updateIdb, entries } from 'idb-keyval'

const push = (key, item) => {
	update(key, (val) => [...val, item])
}

const create = async (key, arr = []) => {
	try {
		if (!Array.isArray(arr)) {
			console.error(`${key} value is not array`)
			return false
		}
		await set(key, arr)
		return true
	} catch (err) {
		return false
	}
}

const remove = async (key, id) => {
	const value = await get(key)
	const removed = value.find((item) => item.id == id)
	const data = value.filter((item) => item.id !== id)
	await set(key, data)
	return removed ? removed : null
}

const find = async (key, id) => {
	const data = await get(key)

	if (!data) {
		console.warn(`${key} doesn't exist`)
		return null
	} else if (!Array.isArray(data)) {
		console.warn(`${key} is not an array`)
		return null
	}

	if (Array.isArray(id)) {
		return data.filter((item) => id.includes(item.id))
	}
	else {
		return data.find((item) => item.id == id)
	}
}

const findMany = async (key, obj) => {
	const data = await get(key)
	const prop = Object.getOwnPropertyNames(obj)[0]

	if (!data) {
		console.warn(`${key} doesn't exist`)
		return null
	}

	const payload = data.filter((item) => item[prop] == obj[prop])

	return payload.length > 0 ? payload : null
}

const update = (key, id, obj) => {
	updateIdb(key, (data) => {
		if (data) {
			return data.map((item) => {
				if (item.id == id) {
					for (const i in obj) item[i] = obj[i]
				}
				return item
			})
		}
	})
}

const sync = async (record) => {
	let data = await entries()
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
	setMany(data)
}

export const db = {
	create: create,
	push: push,
	remove: remove,
	find: find,
	findMany: findMany,
	update: update,
	sync: sync,
}
