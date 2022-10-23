import {set, get} from 'idb-keyval'

test('see if idb-keyval works', async () => {
	await set('test', 'testvalue')	
	const test = await get('test')
	expect(test).toBe('testvalue')
})
