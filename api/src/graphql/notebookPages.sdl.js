export const schema = gql`
  type NotebookPage {
    id: Int!
    page: Int!
    content: String
    lesson: Lesson!
    lessonId: Int!
  }

  type Query {
    notebookPages: [NotebookPage!]! @requireAuth
    notebookPage(id: Int!): NotebookPage @requireAuth
  }

  input CreateNotebookPageInput {
    page: Int!
    content: String
    lessonId: Int!
  }

  input UpdateNotebookPageInput {
    page: Int
    content: String
    lessonId: Int
  }

  type Mutation {
    createNotebookPage(input: CreateNotebookPageInput!): NotebookPage!
      @requireAuth
    updateNotebookPage(
      id: Int!
      input: UpdateNotebookPageInput!
    ): NotebookPage! @requireAuth
    deleteNotebookPage(id: Int!): NotebookPage! @requireAuth
  }
`
