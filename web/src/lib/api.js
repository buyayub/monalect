import { cache, db } from 'src/lib/'

const changedKey = 'offline-changes'
const tempIds = 'id-record'

let api = {}

api.create = async (request) => {
	let online = cache.get('online')
	if (online) cache.create(`temp-${request.id}`, [
		{
			type: 'create',
			gql: request.gql,
			id: request.id,
			variables: request.variables
		}
	])

	if (!cache.get(tempIds)) cache.create(tempIds, [])
	cache.collection.push(tempIds, { id: request.id, real: null })

	const response = await request.client.mutate({
		gql: request.gql,
		variables: request.variables})
	
	if (response && !online) {
		cache.collection.update(tempIds, request.id, 'real', response.data.real)
		cache.update('online', true)	
		document.dispatchEvent(new Event('sync'))
	}
	else if (response && online) {
		cache.collection.update(tempIds, request.id, 'real', response.data.real)
		await updateQueue(request)
	}
	else if (!response) {
		if (online) cache.remove(`temp-${request.id}`)
		cache.update('online', false)
		cache.create(changedKey, [])
		cache.collection.push(changedKey, { 
			id: request.id,
			type: 'create',
		})
	}
}

api.update = async (request, queued=false) => {
	let online = cache.get('online')
	let queue = cache.get(`temp-${request.id}`)
	if (!cache.get(tempIds)) cache.create(tempIds, [])
	let tempRecord = cache.get(tempIds)

	if (online && queue && queue.length > 0 && !queued) {
		pushQueue('update', request)
		return null
	}
	else if (online && !queue && !queued) {
		cache.create(`temp-${request.id}`, [
			{
				type: 'update',
				id: request.id,
				gql: request.gql,
				variables: request.variables
			}
		])
	}

	// this has to be more fully realized
	const entry = tempRecord.find((item) => item.id == request.id)
	const ping = (entry && !entry.real)

	let response = null
	// send ping if it's a temporary id, otherwise send update
	if (ping) {
		response = await request.client.query({
			gql: "ping"
		})
	}
	else if ((entry && entry.real) || !entry) {
		if (entry && entry.real) request.variables.id = entry.real
		response = await request.client.mutate({
			gql: request.gql,
			variables: request.variables
		})
	}


	if (response && online){ await updateQueue(request) }
	else if (response && !online) {
		// because the api call is done after the element is updated, we can ignore update events for the changed elements record, the sync event will take care of everything
		cache.update('online', true)	
		document.dispatchEvent(new Event('sync'))
	}
	else if (!response) {
		if (online) cache.remove(`temp-${request.id}`)

		cache.create(changedKey, []) // won't happen if it already exists
		const record = cache.get(changedKey)
		const recordEntry = record.find((item) => (item.id == request.id))
		if (!recordEntry) {
			cache.collection.push(changedKey, { 
				id: request.id,
				type: 'update',
			})
		}

		cache.update('online', false)
	}
}

api.remove = async (request, queued=false) => {
	let online = cache.get('online')
	let queue = cache.get(`temp-${request.id}`)
	if (!cache.get(tempIds)) cache.create(tempIds, [])
	let tempRecord = cache.get(tempIds)
	cache.create(changedKey, []) // won't happen if it already exists

	if (online && queue && queue.length > 0 && !queued) {
		pushQueue('update', request)
		return null
	}
	else if (online && !queue && !queued) {
		cache.create(`temp-${request.id}`, [
			{
				type: 'delete',
				id: request.id,
				gql: request.gql,
				variables: request.variables
			}
		])
	}

	// this has to be more fully realized
	const entry = tempRecord.find((item) => item.id == request.id)
	const ping = (entry && !entry.real)

	let response = null
	// send ping if it's a temporary id with no real counterpart, otherwise send update
	if (ping) {
		response = await request.client.query({
			gql: "ping"
		})
	}
	else if ((entry && entry.real) || !entry) {
		if (entry && entry.real) request.variables.id = entry.real
		response = await request.client.mutate({
			gql: request.gql,
			variables: request.variables
		})
	}


	if (response){ 		
		cache.remove(`temp-${request.id}`)
		if (ping) cache.collection.remove(tempIds, request.id)
		if (!online) {
			cache.collection.remove(changedKey, request.id)
			cache.update('online', true)	
			document.dispatchEvent(new Event('sync'))
		}
	}
	else if (!response) {
		if (online) cache.remove(`temp-${request.id}`)
		if (!entry) {
			cache.collection.push(changedKey, { 
				id: request.id,
				type: 'delete',
			})
		}
		cache.update('online', false)
	}
}

export async function updateQueue (request) {
	let queue = cache.get(`temp-${request.id}`)
	queue = queue.slice(1)
	cache.update(`temp-${request.id}`, queue)

	if (queue.length > 0) {
		let newRequest = queue[0]
		newRequest.client = request.client
		await api[newRequest.type](newRequest, true)
	}
}

export function pushQueue (type, request) {
	cache.array.push(`temp-${request.id}`, {
		type: type,
		id: request.id,
		gql: request.gql,
		variables: request.variables
	})
}

export { api }
