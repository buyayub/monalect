import { CacheBase } from './prototype'


// we use CacheBase because if we use the finished product (a cache object with a record handler) then it'd get recursive and cause a bunch of headaches. 
// It's split up this way to avoid circular dependencies as well

// NOTE: REMEMBER TO TURN THESE ASYNC AFTER TESTS, JEST DOESNT LIKE IT
function Record() {
	const cache = new CacheBase
	this.recordKey = `cache-record-access`
	const recordKey = this.recordKey // I know. I'll change it later.

	this.add = (key) => {
		const exists = cache.get(recordKey)
		if (!exists) cache.create(recordKey, []) 
		cache.apply(recordKey, (rec) => {
			rec.push({
				key: key,
				access: Date.now(),
			})
			return rec
		})
	}

	this.update = (key) => {
		const exists = cache.get(recordKey)
		if (!exists) cache.create(recordKey, [])

		cache.apply(recordKey, (rec) => {
			let entry = rec.find((item) => item.key === key)
			if (!entry) {
				rec.push({
					key: key,
					access: Date.now(),
				})
			} else {
				entry.access = Date.now()
			}
			return rec
		})
	}

	this.remove = (key) => {
		cache.apply(recordKey, (rec) => {
			return rec.filter((item) => item.key !== key)
		})
	}

	this.get = (key) => {
		const rec = cache.get(recordKey)
		const value = rec.find((item) => item.key == key)
		return value ? value : null
	}
}

export { Record }
