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

	type Uploaded {
		materialId: Int!
		localId: Int!
		presigned: String!
	}

	type Mutation {
		createBatchCourse(input: CreateBatchCourseInput!): [Uploaded]! @requireAuth
	}
`
