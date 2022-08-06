export const schema = gql`
	type Lesson {
		id: Int!
		user: User!
		userId: Int!
		course: Course!
		courseId: Int!
		title: String!
		notebookPages: [NotebookPage]!
		sections: [SectionOnLesson]!
		article: [ArticleOnLesson]!
	}

	type Display {
		id: Int!
		index: Int!
		notebookPages: Int
		questionCount: Int
		mark: Int
	}	

	type Query {
		lessons: [Lesson!]! @requireAuth
		lesson(id: Int!): Lesson @requireAuth
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
