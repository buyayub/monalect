import { CREATE_TEST } from 'src/queries'
import { db } from 'src/lib/db'
import { cache } from 'src/lib/cache'

export const createTest = async (client, userId, courseId, input) => {
	const response = await client.mutate({
		mutation: CREATE_TEST,
		variables: {
			userId: userId,
			input: input,
		},
	})

	const record = response.data.createTest
	db.syncId([record])
	cache.syncId([record], courseId)
	return record
}
