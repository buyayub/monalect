export const GET_ALL_COURSES = gql`
	query CoursesQuery($userId: Int!) {
		courses(userId: $userId) {
			id
			title
			description
		}
	}
`
