import { useQuery, useMutation } from '@apollo/client'
import Modal from 'src/components/Modal'
import Test from 'src/components/Test'
import Button from 'src/components/Button'
import { useState, useEffect, useRef } from 'react'
import { getLessonList } from 'src/models/lesson'

const TestLessonWrapper = ({ courseId, userId, testSubmit = null }) => {
	const [lessons, setLessons] = useState(undefined)
	const [selectedLessonIds, setSelectedLessonIds] = useState(null)
	const [takeTest, setTakeTest] = useState(false)

	// if selected lessons are set, show test
	useEffect(() => {
		if (selectedLessonIds) {
			setTakeTest(true)
		}
	}, [selectedLessonIds])

	if (!lessons) {
		getLessonList(courseId).then((list) => setLessons(list))
	}

	// On form submit, collect all the lessons and update selected lessons for the test.
	const onSubmit = (e) => {
		e.preventDefault()
		let lessonBuf = []
		for (const item of e.target) {
			if (item.value && item.checked) {
				lessonBuf.push(parseInt(item.value))
			}
		}

		if (lessonBuf.length == 0) return null

		setSelectedLessonIds(lessonBuf)
	}

	const handleTest = () => {}

	const updateLessons = (lessonMarks) => {
		let lessonCopy = JSON.parse(JSON.stringify(lessons))
		for (let lesson of lessonCopy) {
			const lessonWithMark = lessonMarks.find(
				(item) => (item.lessonId == lesson.id)
			)

			if (lessonWithMark)
				lesson.mark = Math.floor((lessonWithMark.correct / lessonWithMark.count) * 100)
		}
		setLessons([...lessonCopy])
	}

	return (
		<>
			<form className="mn-flex-column mn-gap-medium" onSubmit={onSubmit}>
				<div className="mn-flex-row mn-align-end mn-justify-space-between">
					<h3>Lessons</h3>
					<Button type="submit"> Test </Button>
				</div>
				<div className="mn-flex-column mn-gap-small">
					{lessons
						? lessons.map((lesson) => (
								<TestLesson lesson={lesson} key={lesson.id} />
						  ))
						: ''}
				</div>
			</form>
			<Modal show={takeTest}>
				{takeTest ? (
					<Test
						courseId={courseId}
						userId={userId}
						selectedLessonIds={selectedLessonIds}
						handleTest={handleTest}
						cancel={() => {
							setTakeTest(false)
						}}
						updateLessons={updateLessons}
					/>
				) : (
					''
				)}
			</Modal>
		</>
	)
}

const TestLesson = ({ lesson }) => {
	const checkbox = useRef(null)
	return (
		<div
			className="mn-flex-row mn-gap-medium mn-clickable"
			onClick={() => {
				if (checkbox) {
					checkbox.current.checked = !checkbox.current.checked
				}
			}}
		>
			<input
				onClick={() => {
					if (checkbox) {
						checkbox.current.checked = !checkbox.current.checked
					}
				}}
				type="checkbox"
				value={lesson.id}
				ref={checkbox}
				className="mn-clickable"
			/>
			<div> {lesson.index + 1}. </div>
			<div className="mn-flex-row mn-gap-large mn-grow mn-justify-space-between mn-text-padding mn-border-left">
				<p> {lesson.title} </p>
				<div className="mn-flex-row mn-gap-x-large">
					<p className="mn-is-inactive">{lesson.questionCount} questions</p>
					<div className="mn-width-large mn-text-align-end">
						{lesson.mark ? lesson.mark : 0}%
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestLessonWrapper
