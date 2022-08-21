import { useQuery, useMutation } from '@apollo/client'
import QuestionLesson from 'src/components/QuestionLesson'
import QuestionForm from 'src/components/QuestionForm'
import { useState, useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import Modal from 'src/components/Modal'

const LOAD_QUESTIONS = gql`
	query LoadQuestions($userId: Int!, $courseId: Int!) {
		questionsByLesson(userId: $userId, courseId: $courseId) {
			id
			title
			index
			questions {
				id
				question
				multiple
				answers {
					id
					answer
					correct
				}
			}
		}
	}
`

const CREATE_QUESTION = gql`
	mutation CreateQuestionMutation($userId: Int!, $input: CreateQuestionInput!) {
		createQuestion(userId: $userId, input: $input) {
			id
		}
	}
`

/*
const DELETE_QUESTION = gql`
	mutation DeleteQuestionMutation($userId: Int!, $questionId: Int!) {
		deleteQuestion(userId: $userId, questionId: $questionId)
	}
`

const CREATE_ANSWER = gql`
	mutation CreateAnswerMutation($userId: Int!, $input: CreateAnswerInput!) {
		createAnswer(userId: $userId, input: $input) {
			id
		}
	}
`
const DELETE_ANSWER = gql`
	mutation DeleteAnswerMutation($userId: Int!, $id: Int!) {
		deleteAnswer(userId: $userId, id: $id)
	}
`
*/
const QuestionWrapper = ({ courseId }) => {
	const { currentUser } = useAuth()
	const {
		data: questionLessons,
		loading,
		error,
	} = useQuery(LOAD_QUESTIONS, {
		variables: { userId: currentUser.id, courseId: courseId },
	})
	const [createQuestion, { data: questionId }] = useMutation(CREATE_QUESTION)
	const [lessons, setLessons] = useState(undefined)

	const [questionForm, setQuestionForm] = useState(false)
	const [answerForm, setAnswerForm] = useState(false)
	const toggleQuestionForm = () => {
		setQuestionForm(!questionForm)
	}
	const toggleAnswerForm = () => {
		setQuestionForm(!answerForm)
	}

	const [lessonSelect, setLessonSelect] = useState(undefined)
	const [questionSelect, setQuestionSelect] = useState(undefined)

	useEffect(() => {
		if (questionLessons) {
			setLessons(questionLessons.questionsByLesson)
			console.log(questionLessons)
		}
	}, [questionLessons])

	if (loading) return 'Loading'
	if (error) return `Error! ${error}`

	const submitQuestion = (questionType, question, choices = null) => {
		let input = {}

		if (questionType == 'multiple') {
			input = {
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: true,
				choices: choices,
			}
		}

		else if (questionType == 'word') {
			input = {
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: false,
			}
		}


		createQuestion({
			variables: {
				userId: currentUser.id,
				input: input,
			},
		}).then((response) => {
			const question = response.data.createQuestion
			let lessonsCopy = lessons
			lessonsCopy
				.find((o) => o.id == question.lessonId)
				.questions.push(question)

			setLessons([...lessonsCopy])
		})
	}

	return (
		<div>
			{lessons
				? lessons.map((lesson) => {
						return (
							<QuestionLesson
								lesson={lesson}
								setLessonSelect={setLessonSelect}
								setQuestionSelect={setQuestionSelect}
								toggleQuestionForm={toggleQuestionForm}
								toggleAnswerForm={toggleAnswerForm}
							/>
						)
				  })
				: ''}
			<p> Lesson Select: {lessonSelect} </p>
			<p> Question Select: {questionSelect} </p>
			<Modal show={questionForm} changeState={() => toggleQuestionForm()}>
				<QuestionForm
					cancel={() => toggleQuestionForm()}
					submitQuestion={submitQuestion}
				/>
			</Modal>
		</div>
	)
}

export default QuestionWrapper
