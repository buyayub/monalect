export const schema = gql`
	type Test {
		id: Int
		courseId: Int
		correct: Int
		count: Int
		quiz: Boolean
	}

	type TestOnLesson {
		id: Int
		mark: Int
		correct: Int
		count: Int
		lessonId: Int
		lessonTitle: String
		testId: Int
	}

	type Query {
		tests(userId: Int! courseId: Int!): [Test!]! @requireAuth
		test(id: Int!): Test @requireAuth
	}

	input CreateTestInput {
		quiz: Boolean!
		courseId: Int!
		correct: Int!
		count: Int!
		tests: [TestOnLessonInput]!
	}

	input TestOnLessonInput {
		correct: Int!
		count: Int!
		lessonId: Int!
	}

	input UpdateTestInput {
		userId: Int
		quiz: Boolean
		courseId: Int
	}

	type Mutation {
		createTest(userId: Int!, input: CreateTestInput!): Test @requireAuth
		updateTest(id: Int!, input: UpdateTestInput!): Test! @requireAuth
		deleteTest(id: Int!): Test! @requireAuth
	}
`
