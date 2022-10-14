export const SAVE_PAGE = gql`
	mutation UpdateNotebookPage(
		$userId: Int!
		$id: Int!
		$input: UpdateNotebookPageInput!
	) {
		updateNotebookPage(userId: $userId, id: $id, input: $input)
	}
`
