export const schema = gql`
  type Answer {
    id: Int!
    answer: String!
    question: Question!
    questionId: Int!
  }

  type Query {
    answers: [Answer!]! @requireAuth
    answer(id: Int!): Answer @requireAuth
  }

  input CreateAnswerInput {
    answer: String!
    questionId: Int!
  }

  input UpdateAnswerInput {
    answer: String
    questionId: Int
  }

  type Mutation {
    createAnswer(input: CreateAnswerInput!): Answer! @requireAuth
    updateAnswer(id: Int!, input: UpdateAnswerInput!): Answer! @requireAuth
    deleteAnswer(id: Int!): Answer! @requireAuth
  }
`
