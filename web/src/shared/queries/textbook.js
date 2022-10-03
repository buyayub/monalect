export const GET_ALL_TEXTBOOKS = gql`
	query GetAllTextbooksQuery($userId: Int!) {
		allTextbooks(userId: $userId) {
			id
			courseId
			title
			author
			pages
			pageOffset
			isbn
			url
		}
	}
`
