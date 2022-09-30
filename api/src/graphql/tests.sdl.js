export const schema = gql`
	type Test {
		id: Int!
		userId: Int!
		courseId: Int!
		correct: Int!
		count: Int!
		quiz: Boolean!
		lessons: [TestOnLesson]!
	}

	type TestOnLesson {
		correct: Int
		count: Int
		lessonId: Int
		testId: Int
	}

	type Query {
		tests: [Test!]! @requireAuth
		test(id: Int!): Test @requireAuth
	}

	input CreateTestInput {
		userId: Int!
		quiz: Boolean!
		courseId: Int!
		tests: [TestOnLessonInput]!
	}

	input TestOnLessonInput {
		mark: Int
		lessonId: Int
	}

	input UpdateTestInput {
		userId: Int
		quiz: Boolean
		courseId: Int
	}

	type Mutation {
		createTest(userId: Int!, input: CreateTestInput!): Test! @requireAuth
		updateTest(id: Int!, input: UpdateTestInput!): Test! @requireAuth
		deleteTest(id: Int!): Test! @requireAuth
	}
`
