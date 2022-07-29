export const schema = gql`
  type Question {
    id: Int!
    question: String!
    multiple: Boolean!
    answers: [Answer]!
    choices: [Choice]!
  }

  type Query {
    questions: [Question!]! @requireAuth
    question(id: Int!): Question @requireAuth
  }

  input CreateQuestionInput {
    question: String!
    multiple: Boolean!
  }

  input UpdateQuestionInput {
    question: String
    multiple: Boolean
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question! @requireAuth
    updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
      @requireAuth
    deleteQuestion(id: Int!): Question! @requireAuth
  }
`
