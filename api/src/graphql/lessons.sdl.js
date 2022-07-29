export const schema = gql`
  type Lesson {
    id: Int!
    title: String!
    articles: [Article]!
    sections: [TextbookSection]!
    notebookPages: [NotebookPage]!
  }

  type Query {
    lessons: [Lesson!]! @requireAuth
    lesson(id: Int!): Lesson @requireAuth
  }

  input CreateLessonInput {
    title: String!
  }

  input UpdateLessonInput {
    title: String
  }

  type Mutation {
    createLesson(input: CreateLessonInput!): Lesson! @requireAuth
    updateLesson(id: Int!, input: UpdateLessonInput!): Lesson! @requireAuth
    deleteLesson(id: Int!): Lesson! @requireAuth
  }
`
