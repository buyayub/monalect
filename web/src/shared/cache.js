const set = (key, value) => {
	sessionStorage.setItem(key, JSON.stringify(value ? value : null))
	localStorage.setItem(key, JSON.stringify(value ? value : null))
}

const get = (key) => {
	const session = sessionStorage.getItem(key)
	if (session)  {
		console.log({session})
		return JSON.parse(session)
	}
	const local = localStorage.getItem(key)
	if (local) return JSON.parse(local)
	console.error("can't find ", key)
	return undefined
}

const apply = (key, func) => {
	let entry = get(key)
	const modified = func(entry)
	set(key, modified)
	return { prev: entry , curr: modified}
}

// push to cache value which happens to be an array
const push = (key, value) => {
	apply(key, val => [...val, value])
}

// safe creation
const create = (key, value) => {
	console.log("create key:", key)
	if (!get(key)){
		console.log("yo")
		set(key, value)
	} else {
		console.error(`${key} already created`)
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

export const cache = {
	set: set,
	get: get,
	apply: apply,
	push: push,
	create: create,
	update: update,
}
