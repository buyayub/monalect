export const schema = gql`
	type All {
		course: [Course]!
		lesson: [Lesson]!
		textbook: [Textbook]!
		section: [TextbookSection]!
		article: [Article]!
		question: [Question]!
		answer: [Answer]!
		test: [Test]!
		notebookPage: [NotebookPage]!
		sectionOnLesson: [SectionOnLesson]!
		articleOnLesson: [ArticleOnLesson]!
		testOnLesson: [TestOnLesson]!
	}

	input BatchMaterial {
		type: String!
		localId: Int!
		title: String!
		identifier: String
		uploaded: Boolean
		author: String
		pages: Int
		offset: Int
	}

	input BatchSection {
		localId: Int!
		title: String
		textbookId: Int!
		start: Int
		end: Int
	}

	input BatchLesson {
		title: String
		index: Int!
		localId: Int!
	}

	input BatchLink {
		localId: Int!
		type: String!
		lessonId: Int!
		materialId: Int!
	}

	input BatchPage {
		localId: Int!
		lessonId: Int!
	}

	input CreateBatchCourseInput{
		title: String
		description: String
		localId: Int
		material: [BatchMaterial]
		section: [BatchSection]
		lesson: [BatchLesson]
		link: [BatchLink]
		page: [BatchPage]

	}

	type Query {
		all(userId: Int!): All @requireAuth
	}

	type Uploaded {
		type: String!
		materialId: Int!
		presigned: String!
		url: String!
	}

	type Ids {
		local: Int!
		real: Int
	}

	type BatchReturn {
		uploaded: [Uploaded]
		record: [Ids]		
	}

	type Mutation {
		createBatchCourse(userId: Int!, input: CreateBatchCourseInput!): BatchReturn @requireAuth
	}

	type BatchUser {
		courses: [Course] 
		lessons: [Lesson]
	}
`
