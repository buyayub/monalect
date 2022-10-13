import { db } from 'src/shared/db'

export const createAnswer = async (questionId, input) => {
	db.push('answer', {
		id: input.id,
		questionId: input.questionId,
		answer: input.answer,
		correct: input.correct,
	})
}

export const deleteAnswer = async (answerId) => {
	console.log({answerId})
	db.del('answer', 'id', answerId)
}
