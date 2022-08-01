export const schema = gql`
	type SectionOnLesson {
		id: Int!
		lesson: Lesson!
		lessonId: Int!
		section: TextbookSection!
		sectionId: Int!
	}

	type Query {
		sectionOnLessons: [SectionOnLesson!]! @requireAuth
		sectionOnLesson(id: Int!): SectionOnLesson @requireAuth
	}

	input CreateSectionOnLessonInput {
		lessonId: Int!
		sectionId: Int!
	}

	input UpdateSectionOnLessonInput {
		lessonId: Int
		sectionId: Int
	}

	type Mutation {
		createSectionOnLesson(input: CreateSectionOnLessonInput!): SectionOnLesson!
			@requireAuth
		updateSectionOnLesson(
			id: Int!
			input: UpdateSectionOnLessonInput!
		): SectionOnLesson! @requireAuth
		deleteSectionOnLesson(id: Int!): SectionOnLesson! @requireAuth
	}
`
