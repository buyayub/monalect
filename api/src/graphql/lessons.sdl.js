export const schema = gql`
	type Lesson {
		id: Int!
		user: User!
		sections: [TextbookSection]!
		userId: Int!
		course: Course!
		courseId: Int!
		index: Int
		title: String!
		notebookWords: Int
		questionCount: Int
		notebookPages: [NotebookPage]!
		articles: [Article]!
		mark: Int
	}


	# I have absolutely no clue why this one works but Lesson doesn't. Not a single fucking clue. 
	# It's a phantom bug, no matter how deep I searched I couldn't find a reason.
	# Sign of the end times.
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
