export const schema = gql`
	type ArticleOnLesson {
		id: Int!
		lesson: Lesson!
		lessonId: Int!
		article: Article!
		articleId: Int!
	}

	type Query {
		articleOnLessons: [ArticleOnLesson!]! @requireAuth
		articleOnLesson(id: Int!): ArticleOnLesson @requireAuth
	}

	input CreateArticleOnLessonInput {
		lessonId: Int!
		articleId: Int!
	}

	input UpdateArticleOnLessonInput {
		lessonId: Int
		articleId: Int
	}

	type Mutation {
		createArticleOnLesson(input: CreateArticleOnLessonInput!): ArticleOnLesson!
			@requireAuth
		updateArticleOnLesson(
			id: Int!
			input: UpdateArticleOnLessonInput!
		): ArticleOnLesson! @requireAuth
		deleteArticleOnLesson(id: Int!): ArticleOnLesson! @requireAuth
	}
`
