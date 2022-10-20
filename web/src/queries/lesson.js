export const GET_ALL_LESSONS = gql`
	query GetAllLessonsQuery($userId: Int!) {
		allLessons(userId: $userId) {
			id
			courseId
			title
			index
		}
	}
`
