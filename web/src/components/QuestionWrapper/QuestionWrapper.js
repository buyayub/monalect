import { useQuery, useMutation } from '@apollo/client'
import QuestionLesson from 'src/components/QuestionLesson'
import QuestionForm from 'src/components/QuestionForm'
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
	
	const appendQuestion = (question) => {
		//deep copy
		let lessonsCopy = JSON.parse(JSON.stringify(lessons))

		lessonsCopy.find(lesson => lesson.id == question.lessonId).questions.push(question)
		setLessons([...lessonsCopy])
	}

	const handleQuestionDelete = (question) => {
		
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
								handleQuestionDelete={handleQuestionDelete}
							/>
						)
				  })
				: ''}
			<p> Lesson Select: {lessonSelect} </p>
			<p> Question Select: {questionSelect} </p>
			<Modal show={questionForm} changeState={() => toggleQuestionForm()}>
				<QuestionForm
					cancel={() => toggleQuestionForm()}
					returnQuestion={appendQuestion}
					currentUser={currentUser}
					courseId={courseId}
					lessonSelect={lessonSelect}
				/>
			</Modal>
		</div>
	)
}

export default QuestionWrapper
