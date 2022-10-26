import { cache, db } from 'src/lib/'

const changedKey = 'offline-changes'
const tempKey = 'temp-ids'

let api = {}

api.create = async (request) => {
	// options: type, id, gql, variables,
	const tempQueue = `temp-${request.id}`
	const online = cache.get('online')
	let queued = false

	// if temporary id cache hasn't been added yet, then let's create it
	if (!cache.get(tempKey)) cache.create(tempKey, [])

	// push temporary id onto the cache
	cache.array.push(tempKey, request.id)

	if (online) {
		// we check to see if the user is online. if they aren't, then we skip the queue, and just keep it in the temp key list
		cache.create(tempQueue, []) // because it's going to be a novel id, we're going to create the queue
		api.pushQueue(request, 'create', tempQueue)
		queued = true
	}

	const response = await request.client.mutate({
		mutation: request.gql,
		variables: request.variables,
	})

	// if response succeeds
	if (response) {
		let record = response.data

		// we sync our created item first
		cache.sync(record)
		db.sync(record)

		for (const id of record) {
			cache.array.remove(tempKey, id.local)
		}

		if (!online) {
			// if we're not online, then we update the fact we're online and trigger the sync event to update/create everything else
			cache.update('online', true)
			document.dispatchEvent(new Event('mnSync'))
		}
	} else {
		// if request fails, then we enter offline mode, and do nothing
		cache.update('online', false)
	}

	if (online && queued) {
		// if we're online and queued (which only happens when we start online), then update the queue
		api.updateQueue(tempQueue)
	} else if (!online && queued) {
		// if we become offline, then clear the queues, they don't matter anymore, as everything will be updated in batch
		cache.remove(tempQueue)
	}
	// if we start offline and become online, then nothing really changes as the record automatically updates
}

api.update = async (request) => {
	const changedIds = cache.get(changedKey)
	const tempIds = cache.get(tempKey)
	const online = cache.get('online')
	let temp = false
	let queued = true

	// if this id is in the list of temporary ids, then we push it onto the queue and skip this whole process
	console.debug(tempIds)

	if (tempIds && tempIds.includes(request.id)) {
		api.pushQueue(request, 'update', `temp-${request.id}`)
		return null
	}

	// that means this id is real, and so we have to include it in a real queue
	if (online) {
		const queueKey = `${request.type}-${request.id}-queue`
		const queue = cache.get(queueKey)
		// if there isn't already a queue, then we create one and continue, if there is then we wait in line and stop executing.
		if (!queue || queue.length == 0) {
			cache.create(queueKey, [])
			api.pushQueue(request, 'update', queueKey)
			queued = true
			temp = false 
		} else {
			api.pushQueue(request, 'update', queueKey)
			return null
		}
	}

	const response = await request.client.mutate({
		mutation: request.gql,
		variables: request.variables,
	})

	// TODO: edit the conditional to check for status codes rather than if response exists or not
	if (response) {
		document.dispatchEvent(new Event('mnSync'))

		const queueKey = temp ? `temp-${request.id}` : `${request.type}-${request.id}-queue`

		if (queued) api.updateQueue(queueKey)
		if (!online) cache.update('online', true)
	} else if (!response && online) {
		cache.update('online', false)
	}
}

api.updateQueue = (queueKey) => {
	// removes the first element in queue, then executes the next request
	let queue = cache.get(queueKey)
	queue = queue.slice(1)
	cache.update(queueKey, queue)
	if (queue.length > 0) api[queue[0].type](queue[0]) // execute next
}

api.pushQueue = (request, type, queue) => {
	console.debug(queue)
	cache.array.push(queue, {
		type: type,
		gql: request.gql,
		variables: request.variables,
	}) // add it to the queue
}

export { api }
