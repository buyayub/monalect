export const schema = gql`
	type TextbookSection {
		id: Int
		title: String
		start: Int
		end: Int
		textbookId: Int
	}

	type Query {
		textbookSections(userId: Int!): [TextbookSection]! @requireAuth
		textbookSection(id: Int!): TextbookSection @requireAuth
	}

	input CreateTextbookSectionInput {
		userId: Int!
		title: String!
		start: Int!
		end: Int!
		textbookId: Int!
	}

	input UpdateTextbookSectionInput {
		userId: Int
		title: String
		start: Int
		end: Int
		textbookId: Int
	}

	type Mutation {
		createTextbookSection(input: CreateTextbookSectionInput!): TextbookSection!
			@requireAuth
		updateTextbookSection(
			id: Int!
			input: UpdateTextbookSectionInput!
		): TextbookSection! @requireAuth
		deleteTextbookSection(id: Int!): TextbookSection! @requireAuth
	}
`
