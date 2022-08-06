export const schema = gql`

	input BatchMaterial {
		type: String!
		localId: Int!
		title: String!
		identifier: String
		author: String
		pages: Int
		offset: Int
		sections: [BatchSection]
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

	input CreateBatchCourseInput{
		userId: Int!
		title: String!
		material: [BatchMaterial]
		lesson: [BatchLesson]
	}


	type Mutation {
		createBatchCourse(input: CreateBatchCourseInput!): Course! @requireAuth
	}
`
