import { createAnswer, deleteAnswer } from 'src/controller/answer'
import { cache, db } from 'src/lib'
import { clear, get } from 'idb-keyval'

const changedKey = 'offline-changes'
const tempIds = 'id-record'

beforeEach(async () => {
	localStorage.clear()
	sessionStorage.clear()
	clear()
	await db.init()
	cache.create('online', true)
})

const mockInput = {
	id: 12,
	questionId: 8,
	answer: 'this is an answer',
	correct: true,
}

const mockInput2 = {
	id: 11,
	questionId: 4,
	answer: 'this is another answer',
	correct: false,
}

const mockClient = {
	mutate: async (config) => {
		return { data: { id: 12, real: 33 } }
	},
	query: async (config) => true,
}

const mockClient2 = {
	mutate: async (config) => {
		return { data: { id: 11, real: 34 } }
	},
	query: async (config) => true,
}

const mockUserId = 2
const mockCourseId = 4
const cacheKey = `course-${mockCourseId}-answer`

describe('create answer', () => {
	test('create', async () => {
		await createAnswer(mockClient, mockUserId, mockCourseId, mockInput)

		expect(cache.get(cacheKey)).toStrictEqual([mockInput])
		expect(await get('answer')).toStrictEqual([mockInput])
		expect(await db.find('answer', mockInput.id)).toStrictEqual(mockInput)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 12, real: 33 }])
	})

	test('create same id twice', async () => {
		await createAnswer(mockClient, mockUserId, mockCourseId, mockInput)
		await createAnswer(mockClient, mockUserId, mockCourseId, mockInput)

		expect(cache.get(cacheKey)).toStrictEqual([mockInput])
		expect(await get('answer')).toStrictEqual([mockInput])
		expect(await db.find('answer', mockInput.id)).toStrictEqual(mockInput)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 12, real: 33 }])
	})

	test('create dif id twice', async () => {
		await createAnswer(mockClient, mockUserId, mockCourseId, mockInput)
		await createAnswer(mockClient2, mockUserId, mockCourseId, mockInput2)

		expect(cache.get(cacheKey)).toStrictEqual([mockInput, mockInput2])
		expect(await get('answer')).toStrictEqual([mockInput, mockInput2])
		expect(await db.find('answer', mockInput.id)).toStrictEqual(mockInput)
		expect(await db.find('answer', mockInput2.id)).toStrictEqual(mockInput2)
		expect(cache.get(tempIds)).toStrictEqual([
			{ id: 12, real: 33 },
			{ id: 11, real: 34 },
		])
	})
})

describe('answer deletion', () => {
	test('delete', async () => {
		await createAnswer(mockClient,mockUserId, mockCourseId, mockInput)
		await deleteAnswer(mockClient, mockUserId, mockCourseId, 12)

		expect(cache.get(cacheKey)).toStrictEqual([])
		expect(await get('answer')).toStrictEqual([])
		expect(await db.find('answer', mockInput.id)).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([])
	})
})
