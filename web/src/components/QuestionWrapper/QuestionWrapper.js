import { useQuery, useMutation } from '@apollo/client'
import QuestionLesson from 'src/components/QuestionLesson'
import QuestionForm from 'src/components/QuestionForm'
import AnswerForm from 'src/components/AnswerForm'
import { useState, useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import Modal from 'src/components/Modal'
import { getQuestionLessons } from 'src/models/question'

const QuestionWrapper = ({ courseId }) => {
	const { currentUser } = useAuth()
	const [lessons, setLessons] = useState(undefined)
	const [updateAns, setUpdateAns] = useState(false)
	const [updateQues, setUpdateQues] = useState(false)
	const [record, setRecord] = useState(null)
	const [recordQues, setRecordQues] = useState(null)

	const [lessonSelect, setLessonSelect] = useState(null)
	const [questionForm, setQuestionForm] = useState(false)
	const [answerForm, setAnswerForm] = useState(false)
	const [answerType, setAnswerType] = useState(true)

	useEffect(() => {
		if (updateAns && record) {
			updateAnswer(record.local, record.real)
			console.log('update ', { lessons })
		}
	}, [updateAns, record])

	useEffect(() => {
		if (updateQues && recordQues) {
			updateQuestion(recordQues.local, recordQues.real)
			console.log('update ', { lessons })
		}
	}, [updateQues, recordQues])

	const toggleQuestionForm = () => {
		setQuestionForm(!questionForm)
	}
	const toggleAnswerForm = () => {
		setAnswerForm(!answerForm)
	}

	if (!lessons) {
		getQuestionLessons(courseId).then((list) => {
			setLessons(list)
		})
	}

	const [questionSelect, setQuestionSelect] = useState(undefined)

	const appendQuestion = (question) => {
		//deep copy
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))
		lessonsCopy
			.find((lesson) => lesson.id == question.lessonId)
			.questions.push(question)
		setLessons([...lessonsCopy])
	}

	const updateQuestion = (id, newId) => {
		console.log("updateQuestion ", {id}, " ", {newId}, " ", {recordQues})
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))
		for (let lesson of lessonsCopy) {
			let question = lesson.questions.find((question) => (question.id == id))
			if (question) question.id = newId
		}
		console.log({lessonsCopy})
		setLessons([...lessonsCopy])
		setRecordQues(null)
		setUpdateQues(false)
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

	const updateAnswer = (id, newId) => {
		let newLessons = JSON.parse(JSON.stringify(lessons))
		console.log({ newLessons })
		console.log({ lessons })
		console.log({ id })
		console.log({ newId })
		let lesson = newLessons.find((les) =>
			les.questions.find((ques) => ques.answers.find((ans) => ans.id == id))
		)
		let question = lesson.questions.find((ques) =>
			ques.answers.find((answer) => answer.id == id)
		)
		let answer = question.answers.find((ans) => ans.id == id)
		answer.id = newId
		console.log({ newLessons })
		setRecord(null)
		setUpdateAns(false)
		setLessons([...newLessons])
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
							lessonsCopy[i].questions[j].answers = lessonsCopy[i].questions[
								j
							].answers.filter((e) => e.id != answer.id)
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
					setUpdate={setUpdateQues}
					setRecord={setRecordQues}
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
					setUpdate={setUpdateAns}
					setRecord={setRecord}
				/>
			</Modal>
		</div>
	)
}

export default QuestionWrapper
