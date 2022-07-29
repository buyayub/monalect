export const schema = gql`
  type Goal {
    id: Int!
    variable: String!
    metric: Int!
    goal: Int!
    course: Course!
    courseId: Int!
  }

  type Query {
    goals: [Goal!]! @requireAuth
    goal(id: Int!): Goal @requireAuth
  }

  input CreateGoalInput {
    variable: String!
    metric: Int!
    goal: Int!
    courseId: Int!
  }

  input UpdateGoalInput {
    variable: String
    metric: Int
    goal: Int
    courseId: Int
  }

  type Mutation {
    createGoal(input: CreateGoalInput!): Goal! @requireAuth
    updateGoal(id: Int!, input: UpdateGoalInput!): Goal! @requireAuth
    deleteGoal(id: Int!): Goal! @requireAuth
  }
`
