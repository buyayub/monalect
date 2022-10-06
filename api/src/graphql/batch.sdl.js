export const schema = gql`

	input BatchMaterial {
		type: String!
		localId: Int!
		title: String!
		identifier: String
		uploaded: Boolean
		author: String
		pages: Int
		offset: Int
		sections: [BatchSection]
	}

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

	input BatchSection {
		localId: Int!
		title: String!
		start: Int!
		end: Int!
	}

	input BatchLesson {
			title: String!
			index: Int!
			localId: Int!
			material: [Int]
	}

	input BatchLink {
		type: String!
		lessonId: Int!
		materialId: Int!
	}

	input CreateBatchCourseInput{
		userId: Int!
		title: String!
		material: [BatchMaterial]
		lesson: [BatchLesson]
		link: [BatchLink]
	}

	type Query {
		all(userId: Int!): All @requireAuth
	}

	type Uploaded {
		materialId: Int!
		localId: Int!
		presigned: String!
	}

	type Ids {
		localId: Int!
		Id: Int
	}

	type BatchReturn {
		uploaded: [Uploaded]
		ids: [Ids]		
	}

	type Mutation {
		createBatchCourse(input: CreateBatchCourseInput!): BatchReturn @requireAuth
	}

	type BatchUser {
		courses: [Course] 
		lessons: [Lesson]
	}
`
