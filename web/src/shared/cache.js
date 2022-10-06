const set = (key, value) => {
	sessionStorage.setItem(key, JSON.stringify(value))
	localStorage.setItem(key, JSON.stringify(value))
}

const get = (key) => {
	const session = sessionStorage.getItem(key)
	if (session) return JSON.parse(session)
	const local = localStorage.getItem(key)
	if (local) return JSON.parse(session)
	console.error("can't find ", key)
	return undefined
}

const apply = (key, func) => {
	let value = get(key)
	const prev = value
	value = func(value)
	set(key, value)
	return { prev: prev, curr: value }
}

// push to cache value which happens to be an array
const push = (key, value) => {
	apply(key, (val) => val.push(value))
}

// safe creation
const create = (key, value) => {
	if (!get(key)) {
		set(key, value)
	} else {
		console.error('already created')
	}
}

// safe update
const update = (key, value) => {
	const val = get(key)
	if (val) {
		set(key, value)
		return val
	}
}


export const cache = { set: set, get: get, apply: apply, push: push, create: create, update: update }
