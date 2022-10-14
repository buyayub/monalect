import { createTest as createTestDB } from './db'
import { createTest as createTestCache } from './cache'
import { createTest as createTestAPI } from './api'
import { cache } from 'src/shared/cache'
import { db } from 'src/shared/db'

export const createTest = async (client, userId, courseId, input) => {
	await createTestCache(courseId, input)
	await createTestDB(courseId, input)
	const record = await createTestAPI(client, userId, courseId, input)
	updateMark(courseId)
	return record
}

export const updateMark = async(courseId) => {
	let lessonTests = await db.get('testOnLesson')
	let lessons = await db.get('lesson')

	console.log({lessonTests})
	lessonTests.sort((a, b) => (a.date > b.date) ? 1 : -1)

	const lessonRecord = []
	let totalCount = 0
	let totalCorrect = 0

	for (const lesson of lessons) {
		const lessonTest = lessonTests.find((test) => test.lessonId == lesson.id)
		if (lessonTest) {
			totalCount += lessonTest.count
			totalCorrect += lessonTest.correct
			lessonRecord.push({
				id: lesson.id,
				count: lessonTest.count,
				correct: lessonTest.correct,
			})
		}
	}
	console.log({lessonRecord})
	
	cache.apply(`course-${courseId}`, (course) =>{
		course.mark = (Math.floor((totalCorrect/totalCount)  * 100))
		for (let lesson of course.lessons) {
			const test = lessonRecord.find((item) => item.id == lesson.id)
			if (test) {
				lesson.mark = (Math.floor((test.correct/test.count)  * 100))
			}
			else {
				lesson.mark = 0
			}
		}
		return course
	})
}
