import { get, clear } from 'idb-keyval'
import { db } from 'src/lib/db'

beforeEach(() => {
	clear()
})

describe('database creation', () => {
	test('create empty', async () => {
		await db.create('empty')
		const val = await get('empty')
		expect(val).toStrictEqual([])
	})

	test('create something', async () => {
		let mockObjArray = [
			{ id: 1, title: 'name' },
			{ id: 2, title: 'notherName' },
		]
		await db.create('item', mockObjArray)
		const val = await get('item')
		expect(val).toStrictEqual(mockObjArray)
	})

	test('create invalid', async () => {
		let obj = { yo: 'yo' }
		const resp = await db.create('item', obj)
		const val = await get('item')
		expect(val).toBeFalsy()
		expect(resp).toBe(false)
	})
})

describe('database remove', () => {
	let mockArr = [
		{ id: 1, value: 'name' },
		{ id: 2, value: 'notherName' },
		{ id: 3, value: 56 },
		{ id: 4, value: [1, 2, 3, 4, 5] },
		{ id: 5, value: 56 },
		{ id: 6, value: 72 },
	]

	beforeEach(async () => {
		await db.create('test', mockArr)
	})

	test('remove', async () => {
		const removed = await db.remove('test', 3)
		const data = await get('test')
		expect(data.find((item) => item.id == 3)).toBeFalsy()
		expect(removed).toStrictEqual({ id: 3, value: 56 })
	})

	test('remove nonexistent', async () => {
		const removed = await db.remove('test', 34)
		const data = await get('test')
		expect(data.find((item) => item.id == 34)).toBeFalsy()
		expect(removed).toBeFalsy()
	})
})

describe('database find && findMany', () => {
	let mockArr = [
		{ id: 1, value: 'name' },
		{ id: 2, value: 'notherName' },
		{ id: 3, value: 56 },
		{ id: 4, value: [1, 2, 3, 4, 5] },
		{ id: 5, value: 56 },
		{ id: 6, value: 72 },
	]

	beforeEach(async () => {
		await db.create('test', mockArr)
	})

	test('find', async () => {
		const obj = await db.find('test', 2)
		expect(obj).toStrictEqual({ id: 2, value: 'notherName' })
	})

	test('find array', async () => {
		const obj = await db.find('test', [2, 3, 5])
		expect(obj).toStrictEqual([
			{ id: 2, value: 'notherName' },
			{ id: 3, value: 56 },
			{ id: 5, value: 56 },
		])
	})

	test('find nonexistent id', async () => {
		const obj = await db.find('test', 34)
		expect(obj).toBeFalsy()
	})

	test('find nonexistent key', async () => {
		const obj = await db.find('nonexistent', 4)
		expect(obj).toBeNull()
	})

	test('findMany', async () => {
		const obj = await db.findMany('test', { value: 56 })
		expect(obj).toStrictEqual([
			{ id: 3, value: 56 },
			{ id: 5, value: 56 },
		])
	})

	test('findMany nonexistent', async () => {
		const obj = await db.findMany('blah', { value: 56 })
		expect(obj).toBeFalsy()
	})

	test('findMany invalid obj', async () => {
		const obj = await db.findMany('test', [56])
		expect(obj).toBeFalsy()
	})
})

describe('database update', () => {
	let mockArr = [
		{ id: 1, value: 'name' },
		{ id: 2, value: 'notherName' },
		{ id: 3, value: 56 },
		{ id: 4, value: [1, 2, 3, 4, 5] },
		{ id: 5, value: 56 },
		{ id: 6, value: 72 },
	]

	beforeEach(async () => {
		await db.create('test', mockArr)
	})

	test('update', async () => {
		db.update('test', 3, { value: 23 })
		const obj = await db.find('test', 3)
		expect(obj.value).toBe(23)
	})

	test('update nonexistent id', async () => {
		db.update('test', 34, { value: 52 })
		const obj = await db.find('test', 34)
		expect(obj).toBeFalsy()
	})

	test('update nonexistent key', async () => {
		db.update('nonexistent', 2, { value: 52 })
		const obj = await db.find('nonexistent', 2)
		expect(obj).toBeFalsy()
	})
})

describe('database update', () => {
	let mockArr = [
		{ id: 1, value: 'name' },
		{ id: 2, value: 'notherName' },
		{ id: 3, value: 56 },
		{ id: 4, value: [1, 2, 3, 4, 5] },
		{ id: 5, value: 56 },
		{ id: 6, value: 72 },
	]

	beforeEach(async () => {
		await db.create('test', mockArr)
	})

	test('update', async () => {
		db.update('test', 3, { value: 23 })
		const obj = await db.find('test', 3)
		expect(obj.value).toBe(23)
	})

	test('update nonexistent id', async () => {
		db.update('test', 34, { value: 52 })
		const obj = await db.find('test', 34)
		expect(obj).toBeFalsy()
	})

	test('update nonexistent key', async () => {
		db.update('nonexistent', 2, { value: 52 })
		const obj = await db.find('nonexistent', 2)
		expect(obj).toBeFalsy()
	})
})

describe('database sync', () => {
	let mockArr = [
		{ id: 1, value: 'name' },
		{ id: 2, value: 'notherName' },
		{ id: 3, value: 56, lessonId: 2 },
		{ id: 4, value: [1, 2, 3, 4, 5] },
		{ id: 5, value: 56, courseId: 3 },
		{ id: 6, value: 72 },
	]

	let record = [
		{
			type: 'type1', // unused in this context, but just to make sure
			local: 2,
			real: 43,
		},
		{
			type: 'type2',
			local: 3,
			real: 67,
		},
	]

	beforeEach(async () => {
		await db.create('test', mockArr)
	})

	test('sync', async () => {
		const pre1 = await db.find('test', 2)
		expect(pre1.value).toBe('notherName')

		await db.sync(record)

		const obj1 = await db.find('test', 43)
		const obj2 = await db.find('test', 67)
		const obj3 = await db.find('test', 5)

		expect(obj1.id).toBe(43)
		expect(obj1.value).toBe('notherName')
		expect(obj2.lessonId).toBe(43)
		expect(obj3.courseId).toBe(67)
	})
})
