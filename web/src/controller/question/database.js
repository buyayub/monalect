import { db } from 'src/lib/db'

export const createQuestion = async (courseId, input) => {
	db.push('question', {
		id: input.localId,
		lessonId: input.lessonId,
		courseId: courseId,
		question: input.question,
		multiple: input.multiple,
		choices: input.choices
	})

	for (const answer of input.answers) {
		db.push('answer', {
			id: answer.localId,
			questionId: input.id,
			answer: answer.answer,
			correct: answer.correct
		})
	}
}

export const deleteQuestion = async(questionId) => {
	db.del('question', 'id', questionId)
	db.del('answer', 'questionId', questionId)
}
