import { DELETE_COURSE } from 'src/shared/queries/course'

export const deleteCourse = (client, userId, courseId) => {
	client.mutate({
		mutation: DELETE_COURSE,
		variables: {
			userId: userId,
			id: courseId,
		}
	}).then((response) => {
		console.debug(response)
	})

	console.debug(`course ${courseId} deleted from web api`)
}
