export const schema = gql`
	type Article {
		id: Int!
		user: User!
		userId: Int!
		title: String!
		author: String
		pages: Int
		pageOffset: Int
		doi: String
		uploaded: Boolean!
		url: String
		course: Course!
		courseId: Int!
		lessons: [ArticleOnLesson]!
	}

	type Query {
		articles: [Article!]! @requireAuth
		article(id: Int!): Article @requireAuth
	}

	input CreateArticleInput {
		userId: Int!
		title: String!
		author: String
		pages: Int
		pageOffset: Int
		doi: String
		uploaded: Boolean!
		url: String
		courseId: Int!
	}

	input UpdateArticleInput {
		userId: Int
		title: String
		author: String
		pages: Int
		pageOffset: Int
		doi: String
		uploaded: Boolean
		url: String
		courseId: Int
	}

	type Mutation {
		createArticle(input: CreateArticleInput!): Article! @requireAuth
		updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
		deleteArticle(id: Int!): Article! @requireAuth
	}
`
