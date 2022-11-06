import { cache, db, api } from 'src/lib'
import { CREATE_ANSWER, DELETE_ANSWER } from 'src/queries/'

const tempIds = 'id-record'

export const createAnswer = async (client, userId, courseId, input) => {
	const cacheKey = `course-${courseId}-answer`

	if (!cache.get(cacheKey)) cache.create(cacheKey, [])
	cache.collection.push(cacheKey, input)

	await db.push('answer', {
		id: input.id,
		questionId: input.questionId,
		answer: input.answer,
		correct: input.correct,
	})

	await api.create({
		id: input.id,
		gql: CREATE_ANSWER,
		client: client,
		variables: {
			userId: userId,
			answer: input.answer,
			correct: input.correct,
			questionId: input.questionId,
		},
	})

	return true
}

export const deleteAnswer = async (client, userId, courseId, id) => {
	const cacheKey = `course-${courseId}-answer`

	cache.collection.remove(cacheKey, id)
	cache.collection.remove(tempIds, id)
	await db.remove('answer', id)
	await api.remove({
		id: id,
		gql: DELETE_ANSWER,
		client: client,
		variables: {
			userId: userId,
			id: id,
		},
	})

	return true
}
