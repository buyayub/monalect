export const schema = gql`
	type Lesson {
		id: Int
		courseId: Int
		index: Int
		title: String
	}

	type LessonDisplay {
		id: Int!
		user: User!
		userId: Int!
		course: Course!
		courseId: Int!
		index: Int
		title: String!
		notebookWords: Int
		questionCount: Int
		articles: [Article]!
		sections: [TextbookSection]!
		mark: Int
	}

	type Query {
		lessons(courseId:Int!, userId: Int!): [LessonDisplay!]! @requireAuth
		allLessons(userId: Int!): [Lesson]! @requireAuth
		lesson(userId: Int!, id: Int!): Lesson @requireAuth
	}

	input CreateLessonInput {
		userId: Int!
		courseId: Int!
		title: String!
	}

	input UpdateLessonInput {
		userId: Int
		courseId: Int
		title: String
	}

	type Mutation {
		createLesson(input: CreateLessonInput!): Lesson! @requireAuth
		updateLesson(id: Int!, input: UpdateLessonInput!): Lesson! @requireAuth
		deleteLesson(id: Int!): Lesson! @requireAuth
	}
`
