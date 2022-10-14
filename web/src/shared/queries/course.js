export const GET_ALL_COURSES = gql`
	query CoursesQuery($userId: Int!) {
		courses(userId: $userId) {
			id
			title
			description
		}
	}
`
export const UPDATE_COURSE = gql`
	mutation UpdateCourseMutation(
		$userId: Int!
		$id: Int!
		$input: UpdateCourseInput!
	) {
		updateCourse(userId: $userId, id: $id, input: $input) {
			title
		}
	}
`

export const DELETE_COURSE = gql`
	mutation DeleteCourseMutation($userId: Int!, $id: Int!) {
		deleteCourse(userId: $userId, id: $id)
	}
`
