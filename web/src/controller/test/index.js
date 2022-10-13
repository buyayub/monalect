import { createTest as createTestDB } from './db'
import { createTest as createTestCache } from './cache'
import { createTest as createTestAPI } from './api'

export const createTest = async (client, userId, courseId, input) => {
	await createTestCache(courseId, input)
	await createTestDB(courseId, input)
	return await createTestAPI(client, userId, courseId, input)
}
