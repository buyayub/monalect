export const schema = gql`
	type Question {
		id: Int
		lessonId: Int
		courseId: Int
		question: String
		multiple: Boolean
		choices: Int
	}

	type QuestionLesson {
		id: Int
		index: Int
		title: String
		questions: [QuestionDisplay]!
	}

	type Query {
		questionsByLesson(userId: Int!, courseId: Int!): [QuestionLesson]
			@requireAuth
		questions: [QuestionDisplay!]! @requireAuth
		question(id: Int!): Question @requireAuth
	}

	type QuestionDisplay {
		id: Int!
		lessonId: Int
		question: String!
		multiple: Boolean!
		choices: Int
		answers: [Answer]!
	}

	input CreateQuestionInput {
		courseId: Int!
		localId: Int!
		lessonId: Int!
		question: String!
		choices: Int
		multiple: Boolean!
		answers: [CreateAnswerInput]!
	}

	type CreateQuestionOutput {
		real: Int!
		local: Int!
		answers: [CreateAnswerOutput]
	}

	input UpdateQuestionInput {
		question: String
		multiple: Boolean
	}

	type Record {
		real: Int!
		local: Int!
	}

	type Mutation {
		createQuestion(userId: Int!, input: CreateQuestionInput!): [Record]
			@requireAuth
		updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
			@requireAuth
		deleteQuestion(userId: Int!, questionId: Int!): Question @requireAuth
	}
`
