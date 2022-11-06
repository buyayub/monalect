import { deleteCourse } from 'src/controller/course'
import { clear } from 'idb-keyval'
import { cache, db } from 'src/lib'

beforeEach(async () => {
	localStorage.clear()
	sessionStorage.clear()
	clear()
	await db.init()
	cache.create('online', true)
})

const mockAnswer = {
	id: 12,
	questionId: 8,
	answer: 'this is an answer',
	correct: true,
}

test('hello', () => {})
