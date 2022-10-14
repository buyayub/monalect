import { CREATE_QUESTION, DELETE_QUESTION } from 'src/shared/queries/'
import { db } from 'src/shared/db'
import { cache } from 'src/shared/cache'

export const createQuestion = async (client, userId, courseId, input) => {
	const response = await client.mutate({
		mutation: CREATE_QUESTION,
		variables: {
			userId: userId,
			input: {
				localId: input.localId,
				courseId: courseId,
				lessonId: input.lessonId,
				question: input.question,
				multiple: input.multiple,
				choices: input.choices,
				answers: input.answers,
			},
		},
	})
	const record = response.data.createQuestion
	db.syncId([record])
	cache.syncId([record], courseId)
	console.log("api return ", {record})
	return record
}

export const deleteQuestion = async (client, userId, questionId) => {
	console.log(questionId)
	client.mutate({
		mutation: DELETE_QUESTION,
		variables: {
			userId: userId,
			questionId: questionId,
		},
	})
}
