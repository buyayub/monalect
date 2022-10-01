export const schema = gql`
	type Course {
		id: Int
		user: User
		userId: Int
		title: String
		description: String
		createdAt: DateTime
		lessons: [Lesson]
		textbooks: [Textbook]
		articles: [Article]
		goals: [Goal]
	}

	type Card {
		id: Int!
		title: String!
		description: String
		lessonCount: Int
		notebookWords: Int
		questionCount: Int!
		mark: Int!
	}

	type Query {
		courses(userId: Int!): [Course]! @requireAuth
		course(id: Int!): Course @requireAuth
		cards(userId: Int!): [Card!]! @requireAuth
		card(courseId: Int!): Card! @requireAuth
	}


	input CreateCourseInput {
		userId: Int!
		title: String!
	}

	input UpdateCourseInput {
		title: String
		description: String
	}

	type Mutation {
		createCourse(input: CreateCourseInput!): Course! @requireAuth
		updateCourse(userId: Int!, id: Int!, input: UpdateCourseInput!): Course! @requireAuth
		deleteCourse(userId: Int!, id: Int!): Boolean @requireAuth
	}
`
