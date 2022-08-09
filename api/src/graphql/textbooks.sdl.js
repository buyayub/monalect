export const schema = gql`
	type Textbook {
		id: Int!
		user: User!
		userId: Int!
		title: String!
		author: String
		pages: Int
		pageOffset: Int
		isbn: String
		url: String
		course: Course!
		courseId: Int!
		sections: [TextbookSection]!
	}

	type Query {
		textbooks: [Textbook!]! @requireAuth
		textbook(id: Int!): Textbook @requireAuth
		textbookURL(userId: Int!, id: Int!): String! @requireAuth
	}

	input CreateTextbookInput {
		userId: Int!
		title: String!
		author: String
		pages: Int
		pageOffset: Int
		isbn: String
		url: String
		courseId: Int!
	}

	input UpdateTextbookInput {
		userId: Int
		title: String
		author: String
		pages: Int
		pageOffset: Int
		isbn: String
		url: String
		courseId: Int
	}

	type Mutation {
		createTextbook(input: CreateTextbookInput!): Textbook! @requireAuth
		updateTextbook(id: Int!, input: UpdateTextbookInput!): Textbook!
			@requireAuth
		deleteTextbook(id: Int!): Textbook! @requireAuth
	}
`
