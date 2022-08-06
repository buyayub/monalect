export const schema = gql`
	type Course {
		id: Int!
		user: User!
		userId: Int!
		title: String!
		createdAt: DateTime!
		lessons: [Lesson]!
		textbooks: [Textbook]!
		articles: [Article]!
		goals: [Goal]!
	}

	type Card {
		id: Int!
		title: String!
		notebookWords: Int
		questionCount: Int!
		mark: Int!
	}

	type Query {
		courses(userId: Int!): [Course!]! @requireAuth
		course(id: Int!): Course @requireAuth
		cards(userId: Int!): [Card!]! @requireAuth
		card(courseId: Int!): Card! @requireAuth
	}


	input CreateCourseInput {
		userId: Int!
		title: String!
	}

	input UpdateCourseInput {
		userId: Int
		title: String
	}

	type Mutation {
		createCourse(input: CreateCourseInput!): Course! @requireAuth
		updateCourse(id: Int!, input: UpdateCourseInput!): Course! @requireAuth
		deleteCourse(id: Int!): Course! @requireAuth
	}
`
