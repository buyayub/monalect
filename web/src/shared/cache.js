const set = (key, value) => {
	sessionStorage.setItem(key, JSON.stringify(value ? value : null))
	localStorage.setItem(key, JSON.stringify(value ? value : null))
}

const get = (key) => {
	const session = sessionStorage.getItem(key)
	if (session) {
		return JSON.parse(session)
	}
	const local = localStorage.getItem(key)
	if (local) return JSON.parse(local)
	console.warn("can't find ", key)
	return undefined
}

const remove = (key) => {
	sessionStorage.removeItem(key)
	localStorage.removeItem(key)
}

const apply = (key, func) => {
	let entry = get(key)
	const modified = func(entry)
	set(key, modified)
	return { prev: entry, curr: modified }
}

// push to cache value which happens to be an array
const push = (key, value) => {
	apply(key, (val) => [...val, value])
}

// safe creation
const create = (key, value) => {
	console.debug('create key:', key)
	if (!get(key)) {
		set(key, value)
	} else {
		console.warn(`${key} already created`)
	}
}

// safe update
const update = (key, value) => {
	const val = get(key)
	if (val) {
		set(key, value)
		return val
	}
	console.warn(`${key} does not exist`)
}

const updateProp = (key, prop, value) => {
	let val = get(key)
	if (val) {
		val[prop] = value
		set(key, val)
		return val
	}
	console.warn(`${key} does not exist`)
}

const statistics = async () => {
	let localStorageSize = function () {
		let _lsTotal = 0,
			_xLen,
			_x
		for (_x in localStorage) {
			if (!localStorage.hasOwnProperty(_x)) continue
			_xLen = (localStorage[_x].length + _x.length) * 2
			_lsTotal += _xLen
		}
		return (_lsTotal / 1024).toFixed(2)
	}
	let sessionStorageSize = function () {
		let _lsTotal = 0,
			_xLen,
			_x
		for (_x in sessionStorage) {
			if (!sessionStorage.hasOwnProperty(_x)) continue
			_xLen = (sessionStorage[_x].length + _x.length) * 2
			_lsTotal += _xLen
		}
		return (_lsTotal / 1024).toFixed(2)
	}
	console.info(`local size: ${localStorageSize()}kb`)
	console.info(`session size: ${sessionStorageSize()}kb`)
}

const syncId = (record, courseId) => {
	console.log({ record })
	apply('course-cards', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = record.find((item) => item.local == entry.id)
			if (unique) entry.id = unique.real
			return entry
		})
		return val
	})

	apply('course-dropdown', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = record.find((item) => item.local == entry.id)
			if (unique) entry.value = unique.real
			return entry
		})
		return val
	})

	// recursively iterate through object w/ support for arrays
	const iterate = (obj, func) => {
		if (typeof obj == 'object') {
			for (let item in obj) {
				if (typeof obj[item] == 'object' || Array.isArray(obj[item])) {
					iterate(obj[item], func)
				} else if (func) {
					func(obj, item)
				}
			}
		} else if (Array.isArray(obj)) {
			for (let item of obj) {
				if (typeof item == 'object' || Array.isArray(item)) {
					iterate(item, func)
				} else if (func) {
					func(item)
				}
			}
		}
	}

	let courseEntry = get(`course-${courseId}`)
	let idList = [
		'id',
		'lessonId',
		'courseId',
		'questionId',
		'testId',
		'textbookId',
		'articleId',
		'sectionId',
	]
	iterate(courseEntry, (item, prop) => {
		let id = undefined
		if (idList.includes(prop)) {
			id = record.find((blah) => blah.local == item[prop])
			if (id) {
				item[prop] = id.real
			}
		}
	})
	remove(`course-${courseId}`)
	create(`course-${courseEntry.id}`, courseEntry)
}

export const cache = {
	set: set,
	get: get,
	apply: apply,
	push: push,
	create: create,
	update: update,
	updateProp: updateProp,
	statistics: statistics,
	remove: remove,
	syncId: syncId,
}
