export const schema = gql`
  type Course {
    id: Int!
    title: String!
    createdAt: DateTime!
    user: User!
    userId: Int!
    textbooks: [Textbook]!
    articles: [Article]!
    goals: [Goal]!
  }

  type Query {
    courses: [Course!]! @requireAuth
    course(id: Int!): Course @requireAuth
  }

  input CreateCourseInput {
    title: String!
    userId: Int!
  }

  input UpdateCourseInput {
    title: String
    userId: Int
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course! @requireAuth
    updateCourse(id: Int!, input: UpdateCourseInput!): Course! @requireAuth
    deleteCourse(id: Int!): Course! @requireAuth
  }
`
