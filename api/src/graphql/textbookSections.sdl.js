export const schema = gql`
  type TextbookSection {
    id: Int!
    title: String!
    start: Int!
    end: Int!
    lesson: Lesson
    lessonId: Int
    textbook: Textbook!
    textbookId: Int!
  }

  type Query {
    textbookSections: [TextbookSection!]! @requireAuth
    textbookSection(id: Int!): TextbookSection @requireAuth
  }

  input CreateTextbookSectionInput {
    title: String!
    start: Int!
    end: Int!
    lessonId: Int
    textbookId: Int!
  }

  input UpdateTextbookSectionInput {
    title: String
    start: Int
    end: Int
    lessonId: Int
    textbookId: Int
  }

  type Mutation {
    createTextbookSection(input: CreateTextbookSectionInput!): TextbookSection!
      @requireAuth
    updateTextbookSection(
      id: Int!
      input: UpdateTextbookSectionInput!
    ): TextbookSection! @requireAuth
    deleteTextbookSection(id: Int!): TextbookSection! @requireAuth
  }
`
