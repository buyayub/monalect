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
			id
			answer
			correct
			questionId
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
