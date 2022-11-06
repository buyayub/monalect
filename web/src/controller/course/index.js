import { deleteCourse as deleteCourseDB } from 'src/controller/course/database'
import { DELETE_COURSE } from 'src/queries/course'
import { cache, api } from 'src/lib'

export const deleteCourse = async (client, userId, courseId) => {
	const record = cache.get(cache.record.recordKey)

	const courseCache  = record.filter((item) => item.key.includes(`course-${courseId}`))
	for (const course in courseCache ) {
		cache.remove(course.key)
	}

	deleteCourseDB(courseId)

	api.remove({
		id: courseId,
		client: client,
		gql: DELETE_COURSE,
		variables: {
			userId: userId,
			id: courseId,
		},
	})
	console.debug(`course ${courseId} deleted from web storage`)
}
