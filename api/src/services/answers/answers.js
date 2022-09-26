import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const createAnswer = async ({ userId, input }) => {
	isOwner(userId)

	const answer = await db.answer.create({
		data: {
			userId: userId,
			questionId: input.questionId,
			correct: input.correct,
			answer: input.answer,
		},
		select: {
			id: true,
			questionId: true,
			correct: true,
			answer: true,
		},
	})

	return answer
}

export const deleteAnswer = async ({userId, id }) => {
	isOwner(userId)

	const answer = await db.answer.delete({
		where: {
			id: id
		},
	})

	return answer.id
}
