import { db } from 'src/shared/db'

export const createTest = async (courseId, input) => {
	db.push('test', {
		id: input.id,
		count: input.count,
		correct: input.correct,
		quiz: false,
		date: Date.now(),
		courseId: parseInt(courseId),
	})

	for (const test of input.tests) {
		db.push('testOnLesson', {
			courseId: input.courseId,
			lessonId: test.lessonId,
			testId: input.id,
			count: test.count,
			correct: test.correct,
		})
	}
}
