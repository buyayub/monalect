export const schema = gql`
  type Choice {
    id: Int!
    choice: String!
    question: Question!
    questionId: Int!
  }

  type Query {
    choices: [Choice!]! @requireAuth
    choice(id: Int!): Choice @requireAuth
  }

  input CreateChoiceInput {
    choice: String!
    questionId: Int!
  }

  input UpdateChoiceInput {
    choice: String
    questionId: Int
  }

  type Mutation {
    createChoice(input: CreateChoiceInput!): Choice! @requireAuth
    updateChoice(id: Int!, input: UpdateChoiceInput!): Choice! @requireAuth
    deleteChoice(id: Int!): Choice! @requireAuth
  }
`
