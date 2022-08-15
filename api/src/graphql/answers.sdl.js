export const schema = gql`
  type Answer {
    id: Int!
    answer: String!
    question: Question!
	correct: Boolean!
    questionId: Int
  }

  type Query {
    answers: [Answer!]! @requireAuth
    answer(id: Int!): Answer @requireAuth
  }

  input CreateAnswerInput {
    answer: String!
	correct: Boolean!
    questionId: Int!
  }

  input UpdateAnswerInput {
    answer: String
    questionId: Int
  }

  type Mutation {
	 createAnswer(userId: Int!, input: CreateAnswerInput!): Answer! @requireAuth
    	updateAnswer(id: Int!, input: UpdateAnswerInput!): Answer! @requireAuth
	  deleteAnswer(userid: Int!, id: Int!): Boolean! @requireAuth
  }
`
