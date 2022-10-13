import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const createTest = async ({ userId, input }) => {
	isOwner(userId)

	const test = await db.test.create({
		data: {
			userId: userId,
			courseId: input.courseId,
			correct: input.correct,
			count: input.count,
			quiz: input.quiz,
		},
	})

	for (let lesson of input.tests) {
		await db.testOnLesson.create({
			data: {
				correct: lesson.correct,
				courseId: input.courseId,
				count: lesson.count,
				lessonId: lesson.lessonId,
				testId: test.id,
			},
		})
	}

	return { real: test.id, local: input.id}
}

export const tests = async ({ courseId, userId }) => {
	return null
}
