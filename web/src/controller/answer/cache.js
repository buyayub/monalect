import { cache } from 'src/shared/cache'

export const createAnswer = async (courseId, input) => {
	cache.apply(`course-${courseId}`, (course) => {
		course.lessons.forEach((lesson) =>
			lesson.questions.forEach((question) => {
				if (question.id == input.questionId) {
					question.answers.push({
						id: input.id,
						answer: input.answer,
						correct: input.correct,
					})
				}
			})
		)
		return course
	})
}

export const deleteAnswer = async (courseId, answerId) => {
	cache.apply(`course-${courseId}`, (course) => {
		course.lessons.forEach((lesson) =>
			lesson.questions.forEach((question) => {
				question.answers.filter((answer) => answer.id != answerId)
			})
		)
		return course
	})
}
