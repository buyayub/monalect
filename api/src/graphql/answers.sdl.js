export const schema = gql`
	type Answer {
		id: Int
		answer: String
		correct: Boolean
		questionId: Int
		courseId: Int
	}

	type Query {
		answers: [Answer]! @requireAuth
		answer(id: Int!): Answer @requireAuth
	}

	input CreateAnswerInput {
		localId: Int!
		answer: String!
		correct: Boolean!
		questionId: Int
	}

	type CreateAnswerOutput {
		real: Int!
		local: Int!
		
	}

	input UpdateAnswerInput {
		answer: String
		questionId: Int
	}

	type Mutation {
		createAnswer(userId: Int!, input: CreateAnswerInput!): CreateAnswerOutput @requireAuth
		updateAnswer(id: Int!, input: UpdateAnswerInput!): Answer! @requireAuth
		deleteAnswer(userId: Int!, id: Int!): Int @requireAuth
	}
`
