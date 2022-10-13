import {
	createAnswer as createAnswerCache,
	deleteAnswer as deleteAnswerCache
} from './cache'
import {
	createAnswer as createAnswerDB,
	deleteAnswer as deleteAnswerDB
} from './db'
import {
	createAnswer as createAnswerAPI,
	deleteAnswer as deleteAnswerAPI
} from './api'

export const createAnswer = async (client, userId, courseId, input) => {
	console.log({input})
	await createAnswerCache(courseId, input)
	await createAnswerDB(courseId, input)
	return (await createAnswerAPI(client, userId, courseId,  input))
}

export const deleteAnswer = async (client, userId, courseId, answerId) => {
	await deleteAnswerCache(courseId, answerId)
	await deleteAnswerDB(courseId, answerId)
	await deleteAnswerAPI(client, userId, answerId)
}

