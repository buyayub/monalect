import { Record } from './record'
import { CacheBase } from './prototype'

// push to cache value which happens to be an array
// create the real cache object
function Cache() {
	this.record = new Record()
	// so we can use old functions when creating new functions with record integration
	const cache = new CacheBase()

	this.set = (key, value) => {
		switch (value) {
			case undefined:
				sessionStorage.setItem(key, 'null')
				localStorage.setItem(key, 'null')
				break;
			case false:
				sessionStorage.setItem(key, 'false')
				localStorage.setItem(key, 'false')
				break;
			case true:
				sessionStorage.setItem(key, 'true')
				localStorage.setItem(key, 'true')
				break;
			default: 
				sessionStorage.setItem(key, JSON.stringify(value))
				localStorage.setItem(key, JSON.stringify(value))
		}
		this.record.update(key) 
	}

	this.get = (key) => {
		let data =  sessionStorage.getItem(key)
		let sync = false
		if (!data){ 
			data = localStorage.getItem(key)
			if (data) sessionStorage.setItem(key, data)		
		}
		if (!data) return null

		switch (data) {
			case 'false':
				return false;
				break;
			case 'true':
				return true;
				break;
			default:
				return JSON.parse(data);
		}
	}

	// safe update
	this.update = (key, value) => {
		const val = this.get(key)
		if (val) {
			this.set(key, value)
			this.record.update(key)
			return val
		}
		console.warn(`${key} does not exist`)
		return null
	}

	this.remove = (key) => {
		const value = cache.get(key)
		sessionStorage.removeItem(key)
		localStorage.removeItem(key)
		this.record.remove(key)
		if (!value) console.warn(`can't find key ${key} in cache.remove()`)
		return value
	}

	this.apply = (key, func) => {
		let entry = this.get(key)
		const modified = func(entry)
		this.set(key, modified)
		return { prev: entry, curr: modified } }

	// safe creation
	this.create = (key, value) => {
		if (!this.get(key)) {
			this.set(key, value)
			this.record.add(key)
		} else {
			console.warn(`${key} already created`)
			this.record.add(key)
		}
	}

	this.array = {}

	this.array.push = (key, value) => {
		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not an array`)
			return null
		}
		this.record.update(key)
		val.push(value)
		cache.update(key, val)
		return val
	}

	this.array.remove = (key, value) => {
		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not an array`)
			return null
		}
		this.record.update(key)
		const original = val.filter((item) => item == value)
		val = val.filter((item) => item !== value)
		cache.update(key, val)
		return original
	}

	// define collection

	this.collection = {}

	this.collection.update = (key, id, prop, value) => {
		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not a collection`)
			return null
		}

		let final = val.find((item) => item.id == id)
		let initial = structuredClone(final)
		final[prop] = value
		
		this.record.update(key)
		cache.update(key, val)

		return initial
		console.warn(`${key} does not exist`)
	}


	this.collection.push = (key, value) => {
		if (!value.id) {
			console.warn(`${value} is not a valid value`)
			return null
		}

		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not a collection`)
			return null
		}
		this.record.update(key)
		val.push(value)
		cache.update(key, val)
		return val
	}
	
	// remove collection item, not the collection itself 
	this.collection.remove = (key, id) => {
		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not a collection`)
			return null
		}
		const deleted = val.find((item) => item.id == id)
		val = val.filter((item) => item.id !== id)
		cache.update(key, val)
		return deleted
	}

	this.collection.get = (key, id) => {
		let val = cache.get(key)
		if (!val || !Array.isArray(val)) {
			console.warn(`${key} is not a collection`)
			return null
		}
		const payload = val.find((item) => item.id == id)
		return payload ? payload : null
	}

	// completionist sake
	this.collection.create = (key) => {
		cache.create(key, [])
	}
	
	// size

	this.size = async () => {
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

	this.sync = () => {
		return null
	}
}


const syncId = (rec, courseId) => {
	console.log({ rec })
	apply('course-cards', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = rec.find((item) => item.local == entry.id)
			if (unique) entry.id = unique.real
			return entry
		})
		return val
	})

	apply('course-dropdown', (buff) => {
		let val = buff
		val = val.map((stuff) => {
			let entry = stuff
			let unique = rec.find((item) => item.local == entry.id)
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
			id = rec.find((blah) => blah.local == item[prop])
			if (id) {
				item[prop] = id.real
			}
		}
	})
	remove(`course-${courseId}`)
	create(`course-${courseEntry.id}`, courseEntry)
}

const cache = new Cache()
export { cache }
