function CacheBase() {
	this.set = (key, value) => {
		sessionStorage.setItem(key, JSON.stringify(value ? value : null))
		localStorage.setItem(key, JSON.stringify(value ? value : null))
	}

	this.get = (key) => {
		const session = JSON.parse(sessionStorage.getItem(key))
		if (session) {
			return session
		}
		// if session isn't found, update session to include it
		const local = JSON.parse(localStorage.getItem(key))
		if (local) {
			sessionStorage.setItem(key, JSON.stringify(local ? local : null))
			return local
		}

		// console.warn(`can't find key ${key} in cache.get()`)
		return null
	}

	this.remove = (key) => {
		const value = this.get(key)
		sessionStorage.removeItem(key)
		localStorage.removeItem(key)
		// if (!value) console.warn(`can't find key ${key} in cache.remove()`)
		return value
	}

	this.apply = (key, func) => {
		let entry = this.get(key)
		const modified = func(entry)
		this.set(key, modified)
		return { prev: entry, curr: modified }
	}

	// safe creation
	this.create = (key, value) => {
		//console.debug('create key:', key)
		if (!this.get(key)) {
			this.set(key, value)
		} else {
			console.warn(`${key} already created`)
		}
	}

	// safe update
	this.update = (key, value) => {
		const val = this.get(key)
		if (val) {
			this.set(key, value)
			return val
		}
		//console.warn(`${key} does not exist`)
		return null
	}
}

export { CacheBase }