import { db } from 'src/shared/db'

export const createAnswer = async (questionId, input) => {
	db.push('answer', {
		localId: input.localId,
		questionId: input.questionId,
		answer: input.answer,
		correct: input.correct,
	})
}

export const deleteAnswer = async (answerId) => {
	db.del('answer', 'id', answerId)
}
