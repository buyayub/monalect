import { cache } from 'src/lib/cache'

beforeEach(() => {
	localStorage.clear()
	sessionStorage.clear()
})

describe('cache', () => {
	test('cache library set and get', () => {
		let test1 = 1
		let test2 = [1, 2]
		let test3 = { prop1: 1, prop2: 2 }
		let test4 = NaN
		let test5 = null

		cache.set('test1', test1)
		cache.set('test2', test2)
		cache.set('test3', test3)
		cache.set('test4', test4)
		cache.set('test5', test5)

		expect(cache.get('test1')).toStrictEqual(test1)
		expect(cache.get('test2')).toStrictEqual(test2)
		expect(cache.get('test3')).toStrictEqual(test3)
		expect(cache.get('test4')).toStrictEqual(null)
		expect(cache.get('test5')).toStrictEqual(null)

		// check if it's both in local and sesion storage
		expect(JSON.parse(localStorage.getItem('test1'))).toStrictEqual(test1)
		expect(JSON.parse(sessionStorage.getItem('test1'))).toStrictEqual(test1)
	})

	test('cache library get', () => {
		localStorage.setItem('test', JSON.stringify(2))

		// test if only local storage is available, and creates an item
		expect(cache.get('test')).toStrictEqual(2)
		expect(JSON.parse(sessionStorage.getItem('test'))).toStrictEqual(2)

		// test if key is non-existent
		expect(cache.get('nonexistent')).toStrictEqual(null)
	})

	test('cache remove', () => {
		const key = 'test-cache-remove'
		cache.set(key, 3)

		expect(cache.get(key)).toStrictEqual(3)

		cache.remove(key)

		expect(cache.get(key)).toStrictEqual(null)
	})

	test('cache apply', () => {
		const key = 'test-cache-apply'
	})
})

describe('record in cache context', () => {
	test('ensure it exists on cache creation', () => {
		cache.create('yoyo', 4)
		let record = cache.get(cache.record.recordKey)
		expect(record).not.toBeFalsy()
	})

	test('ensure the date entered is the same', () => {
		cache.create('test', 4)
		let myRecord = cache.get(cache.record.recordKey)
		let entry = myRecord.find((item) => item.key == 'test')
		let entry2 = cache.record.get('test')

		expect(entry.access).toBe(entry2.access)
	})

	test('ensure the date is less than or equal to now', () => {
		cache.create('test', 4)
		let entry = cache.record.get('test')
		expect(entry.access).toBeLessThanOrEqual(Date.now())
	})

	test('ensure updates work', () => {
		cache.create('test', 4)
		let initial = cache.record.get('test')
		cache.update('test', 5)
		let final = cache.record.get('test')

		expect(initial.access).toBeLessThanOrEqual(final.access)
	})

	test('ensure removes work', () => {
		cache.create('test', 4)
		let initial = cache.record.get('test')
		cache.remove('test')
		let final = cache.record.get('test')

		// check if it exists, and if it ends up being null
		expect(initial.key).toBe('test')
		expect(final).toBe(null)

		// also check if record exists and is empty
		expect(cache.get(cache.record.recordKey)).toStrictEqual([])
	})
})

describe('cache collection', () => {
	const invalid = { prop1: 'invalid_object' }
	const value = { id: 1, prop2: 'value1' }
	const value2 = { id: 2, prop2: 'value2' }
	const key = 'test'

	test('add', () => {
		cache.collection.create(key)

		const newCollection = cache.collection.add('test', value)
		expect(newCollection).toContain(value)
	})

	test('add invalid', () => {
		cache.collection.create(key)

		const failedEntry = cache.collection.add('test', invalid)
		expect(failedEntry).toBe(null)
	})

	test('add to non-collection', () => {
		cache.create(key)

		const failedEntry = cache.collection.add('test', value)
		expect(failedEntry).toBe(null)
	})

	describe('collection update', () => {
		beforeEach(() => {
			cache.collection.create(key)
			cache.collection.add('test', value)
		})

		test('update', () => {
			cache.collection.update('test', value.id, 'value', 'newvalue')
			const collection = cache.get('test')
			const something = collection.find((item) => item.id == value.id)

			expect(something.value).toBe('newvalue')
		})

		test('update nonexistant', () => {
			cache.collection.update('test', value.id, 'newprop', 'propvalue')
			const collection = cache.get('test')
			const something = collection.find((item) => item.id == value.id)
			expect(something.newprop).toBe('propvalue')
		})
	})

	describe ('collection remove', () => {
		beforeEach(() => {
			cache.collection.create(key)
			cache.collection.add(key, value)
			cache.collection.add(key, value2)
		})

		test('remove', () => {
			const collection = cache.get('test')
			const colItem = collection.find((item) => item.id == value2.id)
			expect(colItem.id).toBe(2)

			cache.collection.remove(key, 2)
			const collection2 = cache.get('test')
			const colItem2 = collection2.find((item) => item.id == value2.id)
			expect(colItem2).toBeFalsy()
		})

		test('remove return', () => {
			const deleted = cache.collection.remove(key, 1)
			expect(deleted.id).toBe(1)
		})

		test('remove nonexistant', () => {
			cache.collection.remove(key, 3)
		})

	})
})
