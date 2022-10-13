export const GET_ALL = gql`
	query GetAllQuery($userId: Int!) {
		all(userId: $userId) {
			course {
				id
				title
				description
				createdAt
			}
			lesson {
				id
				courseId
				index
				title
			}
			textbook {
				id
				courseId
				title
				author
				pages
				uploaded
				pageOffset
				isbn
				url
			}
			section {
				id
				title
				start
				end
				textbookId
			}
			article {
				id
				title
				author
				pages
				pageOffset
				doi
				uploaded
				url
				courseId
			}
			question {
				id
				lessonId
				courseId
				question
				multiple
				choices
			}
			answer {
				id
				answer
				correct
				questionId
			}
			test {
				id
				courseId
				correct
				count
				quiz
			}
			notebookPage {
				id
				lessonId
				content
				lessonTitle
				words
				courseId
			}
			sectionOnLesson {
				id
				lessonId
				sectionId
			}
			articleOnLesson {
				id
			}
			testOnLesson {
				id
			}
		}
	}
`

export const LOAD_QUESTIONS = gql`
	query LoadQuestions($userId: Int!, $courseId: Int!) {
		questionsByLesson(userId: $userId, courseId: $courseId) {
			id
			title
			index
			questions {
				id
				lessonId
				question
				multiple
				choices
				answers {
					id
					answer
					correct
				}
			}
		}
	}
`

export const CREATE_QUESTION = gql`
	mutation CreateQuestionMutation($userId: Int!, $input: CreateQuestionInput!) {
		createQuestion(userId: $userId, input: $input) {
			real
			local
		}
	}
`

export const DELETE_QUESTION = gql`
	mutation DeleteQuestionMutation($userId: Int!, $questionId: Int!) {
		deleteQuestion(userId: $userId, questionId: $questionId) {
			id
		}
	}
`

export const CREATE_ANSWER = gql`
	mutation CreateAnswerMutation($userId: Int!, $input: CreateAnswerInput!) {
		createAnswer(userId: $userId, input: $input) {
			real
			local
		}
	}
`
export const DELETE_ANSWER = gql`
	mutation DeleteAnswerMutation($userId: Int!, $id: Int!) {
		deleteAnswer(userId: $userId, id: $id)
	}
`
export const GET_LESSONS = gql`
	query GetLessonsQuery($userId: Int!, $courseId: Int!) {
		lessons(courseId: $courseId, userId: $userId) {
			id
			title
			index
		}
	}
`

export const CREATE_TEST = gql`
	mutation CreateTestMutation($userId: Int!, $input: CreateTestInput!) {
		createTest(userId: $userId, input: $input) {
			real
			local
		}
	}
`

export const GET_COURSE_CARDS = gql`
	query CourseCardsQuery($userId: Int!) {
		cards(userId: $userId) {
			id
			title
			description
			notebookWords
			questionCount
			lessonCount
			mark
		}
	}
`

export const CREATE_BATCH = gql`
	mutation CreateBatchCourseMutation($userId: Int!, $input: CreateBatchCourseInput!) {
		createBatchCourse(userId: $userId, input: $input) {
			uploaded {
				type
				materialId
				presigned
			}
			record {
				type
				local
				real
			}
		}
	}
`
