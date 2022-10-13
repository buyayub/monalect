import {
	createQuestion as createQuestionCache,
	deleteQuestion as deleteQuestionCache,
} from './cache'
import {
	createQuestion as createQuestionDB,
	deleteQuestion as deleteQuestionDB,
} from './database'
import {
	createQuestion as createQuestionAPI,
	deleteQuestion as deleteQuestionAPI,
} from './api'

export const createQuestion = async (client, userId, courseId, input) => {
	console.log(input)
	await createQuestionCache(courseId, input)
	await createQuestionDB(courseId, input)
	const record = await createQuestionAPI(client, userId, courseId, input)
	return record
}

export const deleteQuestion = async (client, userId, courseId, questionId) => {
	deleteQuestionCache(courseId, questionId)
	deleteQuestionDB(questionId)
	deleteQuestionAPI(client, userId, questionId)
}
