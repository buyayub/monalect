import { db } from 'src/shared/db'

export const createTest = async (courseId, input) => {
	db.push('test', {
		id: input.id,
		count: input.count,
		correct: input.correct,
		quiz: false,
		date: parseInt(input.date), //graphql doesn't like non-32 bit timestamps, so we had to send it as a string and we're just turning it back into a number for the client database
		courseId: parseInt(courseId),
	})

	console.log({input})

	for (const test of input.tests) {
		db.push('testOnLesson', {
			courseId: input.courseId,
			lessonId: test.lessonId,
			testId: input.id,
			date: parseInt(test.date),
			count: test.count,
			correct: test.correct,
		})
	}
}
