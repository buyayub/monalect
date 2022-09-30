import { useQuery, useMutation } from '@apollo/client'
import QuestionLesson from 'src/components/QuestionLesson'
import QuestionForm from 'src/components/QuestionForm'
import AnswerForm from 'src/components/AnswerForm'
import { useState, useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import Modal from 'src/components/Modal'
import { LOAD_QUESTIONS } from 'src/shared/queries'

const QuestionWrapper = ({ courseId }) => {
	const { currentUser } = useAuth()
	const {
		data: questionLessons,
		loading,
		error,
	} = useQuery(LOAD_QUESTIONS, {
		variables: { userId: currentUser.id, courseId: courseId },
	})
	const [lessons, setLessons] = useState(undefined)

	const [lessonSelect, setLessonSelect] = useState(null)
	const [questionForm, setQuestionForm] = useState(false)
	const [answerForm, setAnswerForm] = useState(false)
	const [answerType, setAnswerType] = useState(true)

	const toggleQuestionForm = () => {
		setQuestionForm(!questionForm)
	}
	const toggleAnswerForm = () => {
		setAnswerForm(!answerForm)
	}

	const [questionSelect, setQuestionSelect] = useState(undefined)

	useEffect(() => {
		if (questionLessons) {
			setLessons(questionLessons.questionsByLesson)
			console.log(questionLessons)
		}
	}, [questionLessons])

	if (loading) return 'Loading'
	if (error) return `Error! ${error}`

	const appendQuestion = (question) => {
		//deep copy
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))

		lessonsCopy
			.find((lesson) => lesson.id == question.lessonId)
			.questions.push(question)
		setLessons([...lessonsCopy])
	}

	const handleQuestionDelete = (question) => {
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))
		lessonsCopy[
			lessonsCopy.findIndex((lesson) => lesson.id == question.lessonId)
		].questions = lessonsCopy
			.find((lesson) => lesson.id == question.lessonId)
			.questions.filter((deadQuestion) => deadQuestion.id != question.id)
		setLessons([...lessonsCopy])
	}

	const handleAnswerDelete = (answer) => {
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))

		// loop through lessons and questions until match, loop through answers until match is found, then remove it
		for (let i = 0; i < lessonsCopy.length; i++) {
			let found = false
			for (let j = 0; j < lessonsCopy[i].questions.length; j++) {
				if (lessonsCopy[i].questions[j].id == answer.questionId) {
					for (let k = 0; k < lessonsCopy[i].questions[j].answers.length; k++) {
						if (lessonsCopy[i].questions[j].answers[k].id == answer.id) {
							// append
							lessonsCopy[i].questions[j].answers = lessonsCopy[i].questions[j].answers.filter((e) => e.id != answer.id)
							found = true
							break
						}
					}
					if (found) {
						break
					}
				}
			}
			if (found) {
				break
			}
		}

		setLessons([...lessonsCopy])
	}

	const appendAnswer = (answer) => {
		//deep copy
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))

		// loop through lessons and their questions until match is made
		for (let i = 0; i < lessonsCopy.length; i++) {
			let found = false
			for (let j = 0; j < lessonsCopy[i].questions.length; j++) {
				if (lessonsCopy[i].questions[j].id == answer.questionId) {
					// append
					lessonsCopy[i].questions[j].answers.push(answer)
					found = true
				}
			}
			if (found) {
				break
			}
		}

		setLessons([...lessonsCopy])
	}

	return (
		<div className="mn-flex-column mn-gap-small">
			{lessons
				? lessons.map((lesson) => {
						return (
							<QuestionLesson
								lesson={lesson}
								setLessonSelect={setLessonSelect}
								setQuestionSelect={setQuestionSelect}
								toggleQuestionForm={toggleQuestionForm}
								toggleAnswerForm={toggleAnswerForm}
								setAnswerType={setAnswerType}
								handleDelete={handleQuestionDelete}
								deleteAnswer={handleAnswerDelete}
							/>
						)
				  })
				: ''}
			<Modal show={questionForm} changeState={() => toggleQuestionForm()}>
				<QuestionForm
					cancel={() => toggleQuestionForm()}
					returnQuestion={appendQuestion}
					currentUser={currentUser}
					courseId={courseId}
					lessonSelect={lessonSelect}
				/>
			</Modal>
			<Modal
				show={answerForm}
				changeState={() => toggleAnswerForm()}
				title={answerType ? 'Correct Answer' : 'Incorrect Answer'}
			>
				<AnswerForm
					cancel={() => toggleAnswerForm()}
					answerType={answerType}
					courseId={courseId}
					questionId={questionSelect}
					currentUser={currentUser}
					submitAnswer={appendAnswer}
				/>
			</Modal>
		</div>
	)
}

export default QuestionWrapper
