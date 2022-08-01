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

	type Query {
		courses: [Course!]! @requireAuth
		course(id: Int!): Course @requireAuth
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
