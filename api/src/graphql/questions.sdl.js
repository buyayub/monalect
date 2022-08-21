export const schema = gql`
	type Question {
		id: Int!
		lessonId: Int
		question: String!
		multiple: Boolean!
		answers: [Answer]!
	}

	type QuestionLesson {
		id: Int,
		index: Int,
		title: String,
		questions: [Question]!
	}

	type Query {
		questionsByLesson(userId: Int!, courseId: Int!): [QuestionLesson] @requireAuth
		questions: [Question!]! @requireAuth
		question(id: Int!): Question @requireAuth
	}

	input CreateQuestionInput {
		courseId: Int!
		lessonId: Int!
		question: String!
		choices: Int
		multiple: Boolean!
	}

	input UpdateQuestionInput {
		question: String
		multiple: Boolean
	}

	type Mutation {
		createQuestion(userId: Int!, input: CreateQuestionInput!): Question! @requireAuth
		updateQuestion(id: Int!, input: UpdateQuestionInput!): Question! @requireAuth
		deleteQuestion(id: Int!): Boolean! @requireAuth
	}
`
