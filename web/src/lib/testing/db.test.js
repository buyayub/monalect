import { get } from 'idb-keyval'
import { db } from 'src/lib/db'

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
})
