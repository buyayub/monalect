export const GET_PRESIGNED = gql`
	query GetPresigned($userId: Int!, $id: Int!) {
		presigned(userId: $userId, id: $id) {
			presigned
			title
		}
	}
`

export const GET_ALL_PRESIGNED = gql`
	query GetPresigned($userId: Int!, $courseId: Int!) {
		allPresigned(userId: $userId, courseId: $courseId) {
			id
			presigned
			title
		}
	}
`

