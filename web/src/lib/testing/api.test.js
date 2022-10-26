import { cache, db, api } from 'src/lib/'
import { clear } from 'idb-keyval'

const changedKey = 'offline-changes'
const tempKey = 'temp-ids'

beforeEach(async () => {
	localStorage.clear()
	sessionStorage.clear()
	await clear()
})

const mockRequest = {
	id: 42,
	client: {
		mutate: async (config) => {
			return { data: [{ local: 42, real: 24 }] }
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: { title: 'a title' },
}

const mockUpdate = {
	id: 42,
	client: {
		mutate: async (config) => {
			return true
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: { title: 'an updated title' },
}

const mockFailedRequest = {
	id: 42,
	client: {
		mutate: async (config) => {
			return null
		},
	},
	type: 'test',
	gql: 'blahblah',
	variables: { title: 'a title' },
}

describe('api create', () => {
	beforeEach(() => {
		document.dispatchEvent = (event) => {
			return null
		}
		cache.create('online', true)
	})

	test('creation check w/o update', async () => {
		let spy = jest.spyOn(api, 'updateQueue').mockImplementation(() => {})
		await api.create(mockRequest)

		expect(cache.get('temp-42')).toStrictEqual([
			{
				type: 'create',
				gql: mockRequest.gql,
				variables: mockRequest.variables,
			},
		])
		expect(cache.get('online')).toBe(true)

		spy.mockRestore()
	})

	test('creation check w/ update', async () => {
		await api.create(mockRequest)
		expect(cache.get('temp-42')).toStrictEqual([])
	})

	test('failed creation', async () => {
		await api.create(mockFailedRequest)
		expect(cache.get(tempKey)).toStrictEqual([42])
		expect(cache.get('online')).toBe(false)
	})
})

describe('api update', () => {
	beforeEach(() => {
		document.dispatchEvent = (event) => {
			return null
		}
		cache.create('online', true)
	})

	test('update w/o queue update', async () => {
		let spy = jest.spyOn(api, 'updateQueue').mockImplementation(() => {})
		await api.create(mockRequest)
		await api.update(mockRequest)

		expect(cache.get('temp-42')).toStrictEqual([
			{
				type: 'create',
				gql: mockRequest.gql,
				variables: mockRequest.variables,
			},
		])

		expect(cache.get('test-42-queue')).toStrictEqual([
			{
				type: 'update',
				gql: mockRequest.gql,
				variables: mockRequest.variables,
			},
		])

		expect(cache.get('online')).toBe(true)
		spy.mockRestore()
	})

	test('update with queue update', async () => {
		await api.create(mockRequest)
		await api.update(mockRequest)
		expect(cache.get('temp-42')).toStrictEqual([])
		expect(cache.get('test-42-queue')).toStrictEqual([])
	})

	test('update w/ conflict', async () => {
		//fake a race condition
		api.createQueue 
		api.pushQueue(mockRequest)
		cache.create(tempKey, [42])

		//execute
		await api.update(mockUpdate)
			
	})
})
