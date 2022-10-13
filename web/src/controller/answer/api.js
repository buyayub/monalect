import { CREATE_ANSWER, DELETE_ANSWER } from 'src/shared/queries/'
import { db } from 'src/shared/db'
import { cache } from 'src/shared/cache'

export const createAnswer = async ( client, userId, courseId, input ) => {
	const response = await client.mutate({
		mutation: CREATE_ANSWER,
		variables: {
			userId: userId,
			input: {
				localId: input.id,
				answer: input.answer,
				correct: input.correct,
				questionId: input.questionId
			}
		}
	})

	const record = response.data.createAnswer
	db.syncId([record])
	cache.syncId([record], courseId)
	return record
}

export const deleteAnswer = async ( client, userId, answerId) => {
	client.mutate({
		mutation: DELETE_ANSWER,
		variables: {
			userId: userId,
			id: answerId,
		},
	})
}
