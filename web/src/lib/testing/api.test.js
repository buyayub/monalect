import { cache, db, api } from 'src/lib/'
import { updateQueue, pushQueue } from 'src/lib/api'
import { clear } from 'idb-keyval'
const changedKey = 'offline-changes'
const tempIds = 'id-record'

beforeEach(async () => {
	localStorage.clear()
	sessionStorage.clear()
	await clear()
	document.dispatchEvent = () => null
	cache.create('online', true)
})

const mockRequest = {
	id: 42,
	client: {
		mutate: async (config) => {
			return { data: { local: 42, real: 24 } }
		},
		query: async (config) => {
			return true
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: { id: 42, title: 'a title' },
}

const mockUpdate = {
	id: 42,
	client: {
		mutate: async (config) => {
			return true
		},
		query: async (config) => {
			return true
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: {
		id: 42,
		title: 'an updated title',
		lessonId: 32,
		questions: [
			{ id: 33, title: 'question 1' },
			{ id: 37, title: 'question 2' },
		],
	},
}

const mockFailedRequest = {
	id: 42,
	client: {
		mutate: async (config) => {
			return null
		},
		query: async (config) => {
			return null
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: { title: 'a title' },
}

describe('test creation', () => {
	test('creation', async () => {
		await api.create(mockRequest)
		expect(cache.get('temp-42')).toStrictEqual([])
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: 24 }])
	})

	test('creation failure', async () => {
		await api.create(mockFailedRequest)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get('online')).toBe(false)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: null }])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'create' }])
	})

	test('creation offline', async () => {
		cache.update('online', false)

		await api.create(mockRequest)

		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: 24 }])
		expect(cache.get(changedKey)).toStrictEqual(null)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get('online')).toBe(true)
	})

	test('creation offline ', async () => {
		cache.update('online', false)

		await api.create(mockFailedRequest)

		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: null }])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'create' }])
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get('online')).toBe(false)
	})

	test('multiple similar creations', async () => {
		await api.create(mockRequest)
		await api.create(mockRequest)
		expect(cache.get('temp-42')).toStrictEqual([])
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: 24 }])
	})
})

describe('test update', () => {
	test('update after creation', async () => {
		await api.create(mockRequest)
		await api.update(mockUpdate)
		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toStrictEqual([])
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: 24 }])
		expect(cache.get(changedKey)).toStrictEqual(null)
	})

	test('update success after creation failure', async () => {
		await api.create(mockFailedRequest)
		await api.update(mockUpdate)
		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: null }])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'create' }])
	})

	test('update failure after creation success', async () => {
		await api.create(mockRequest)
		await api.update(mockFailedRequest)
		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: 24 }])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'update' }])
	})

	test('update failure after creation failure', async () => {
		await api.create(mockFailedRequest)
		await api.update(mockFailedRequest)
		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([{ id: 42, real: null }])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'create' }])
	})

	test('update failure', async () => {
		await api.update(mockFailedRequest)
		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'update' }])
	})

	test('update failure when offline', async () => {
		cache.update('online', false)

		await api.update(mockFailedRequest)

		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual([{ id: 42, type: 'update' }])
	})

	test('update success', async () => {
		await api.update(mockRequest)
		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toStrictEqual([])
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual(null)
	})

	test('update success when offline', async () => {
		cache.update('online', false)
		await api.update(mockRequest)
		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toStrictEqual(null)
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual(null)
	})

	// this test doesn't work if you don't deepcopy
	test('update with recursive syncing', async () => {
		expect(cache.get(tempIds)).toBe(null)
		expect(cache.get(changedKey)).toBe(null)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get('mock-update-config')).toBe(null)

		let newMock = {...mockUpdate}
		newMock.client.mutate = async (config) => {
			cache.create('mock-update-config', config)
			return true
		}

		cache.create(tempIds, [
			{ id: 42, real: 22 },
			{ id: 32, real: 23 },
			{ id: 33, real: 25 },
		])

		await api.update(newMock)
		const request = cache.get('mock-update-config')
		expect(request.variables).toStrictEqual({
			id: 22,
			title: 'an updated title',
			lessonId: 23,
			questions: [
				{ id: 25, title: 'question 1' },
				{ id: 37, title: 'question 2' },
			],
		})
	})
})

describe('api delete', () => {
	test('delete after successful creation', async () => {
		await api.create(mockRequest)
		await api.remove(mockRequest)
		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get(tempIds)).toStrictEqual([
			{
				id: 42,
				real: 24,
			},
		])
	})

	test('delete after failed creation', async () => {
		await api.create(mockFailedRequest)
		await api.remove(mockRequest)

		expect(cache.get('online')).toBe(true)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual([])
	})

	test('failed delete after failed creation', async () => {
		await api.create(mockFailedRequest)
		await api.remove(mockFailedRequest)
		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get(tempIds)).toStrictEqual([])
		expect(cache.get(changedKey)).toStrictEqual([])
	})

	test('failed delete after successful creation', async () => {
		await api.create(mockRequest)
		await api.remove(mockFailedRequest)

		expect(cache.get('online')).toBe(false)
		expect(cache.get('temp-42')).toBe(null)
		expect(cache.get(tempIds)).toStrictEqual([
			{
				id: 42,
				real: 24,
			},
		])
		expect(cache.get(changedKey)).toStrictEqual([
			{
				id: mockRequest.id,
				type: 'remove',
			},
		])
	})
})

describe('race conditionssss', () => {
	describe('creation race condition', () => {
		beforeEach(() => {
			// simulating a race condition where creation happens before it's done
			cache.create('temp-42', [
				{
					type: 'create',
					gql: mockRequest.gql,
					id: mockRequest.id,
					variables: mockRequest.variables,
				},
			])
			cache.create(tempIds, [42])
		})

		test('update race condition w/o update', async () => {
			await api.update(mockUpdate)
			expect(cache.get('temp-42')).toStrictEqual([
				{
					type: 'create',
					id: mockRequest.id,
					gql: mockRequest.gql,
					variables: mockRequest.variables,
				},
				{
					type: 'update',
					gql: mockUpdate.gql,
					id: mockUpdate.id,
					variables: mockUpdate.variables,
				},
			])
		})

		test('update race condition w/ update', async () => {
			await api.update(mockUpdate)
			expect(cache.get('temp-42')).toStrictEqual([
				{
					type: 'create',
					id: mockRequest.id,
					gql: mockRequest.gql,
					variables: mockRequest.variables,
				},
				{
					type: 'update',
					id: mockUpdate.id,
					gql: mockUpdate.gql,
					variables: mockUpdate.variables,
				},
			])
			cache.create(tempIds, [{ id: 42, real: 24 }])
			await updateQueue(mockUpdate)
			expect(cache.get('temp-42')).toStrictEqual([])
		})
	})
})
