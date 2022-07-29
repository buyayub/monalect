export const schema = gql`
  type Article {
    id: Int!
    title: String!
    author: String
    pages: Int
    pageOffset: Int
    doi: String
    uploaded: Boolean!
    url: String
    course: Course!
    courseId: Int!
    lesson: Lesson
    lessonId: Int
  }

  type Query {
    articles: [Article!]! @requireAuth
    article(id: Int!): Article @requireAuth
  }

  input CreateArticleInput {
    title: String!
    author: String
    pages: Int
    pageOffset: Int
    doi: String
    uploaded: Boolean!
    url: String
    courseId: Int!
    lessonId: Int
  }

  input UpdateArticleInput {
    title: String
    author: String
    pages: Int
    pageOffset: Int
    doi: String
    uploaded: Boolean
    url: String
    courseId: Int
    lessonId: Int
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
    deleteArticle(id: Int!): Article! @requireAuth
  }
`
