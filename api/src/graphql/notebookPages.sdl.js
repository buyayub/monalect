export const schema = gql`
	type NotebookPage {
		id: Int
		lessonId: Int
		content: String
		words: Int
		lessonTitle: String
		courseId: Int
	}

	type Query {
		notebookPages(userId: Int!, courseId: Int!): [NotebookPage!]! @requireAuth
		notebookPage(id: Int!): NotebookPage @requireAuth
	}

	input CreateNotebookPageInput {
		page: Int!
		content: String
		lessonId: Int!
	}

	input UpdateNotebookPageInput {
		words: Int
		content: String
	}

	type Mutation {
		createNotebookPage(input: CreateNotebookPageInput!): NotebookPage!
			@requireAuth
		updateNotebookPage(
			id: Int!
			userId: Int!
			input: UpdateNotebookPageInput!
		): Boolean! @requireAuth
		deleteNotebookPage(id: Int!): NotebookPage! @requireAuth
	}
`
