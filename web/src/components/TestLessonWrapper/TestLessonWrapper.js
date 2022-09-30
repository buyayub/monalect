import { useQuery, useMutation } from '@apollo/client'
import Modal from 'src/components/Modal'
import Test from 'src/components/Test'
import Button from 'src/components/Button'
import { useState, useEffect, useRef } from 'react'

const GET_TEST_LESSONS = gql`
	query GetTestLessonsQuery($userId: Int!, $courseId: Int!) {
		lessons(courseId: $courseId, userId: $userId) {
			id
			title
			index
			mark
			questionCount
		}
	}
`

const TestLessonWrapper = ({ courseId, userId, testSubmit = null }) => {
	const { data: lessonsData } = useQuery(GET_TEST_LESSONS, {
		variables: { userId: userId, courseId: parseInt(courseId) },
	})
	const [lessons, setLessons] = useState(undefined)
	const [selectedLessonIds, setSelectedLessonIds] = useState(null)
	const [takeTest, setTakeTest] = useState(false)

	useEffect(() => {
		if (lessonsData) {
			setLessons(lessonsData.lessons)
		}
	}, [lessonsData])

	// if selected lessons are set, show test
	useEffect(() => {
		if (selectedLessonIds) {
			setTakeTest(true)
		}
	}, [selectedLessonIds])

	// On form submit, collect all the lessons and update selected lessons for the test.
	const onSubmit = (e) => {
		e.preventDefault()
		let lessonBuf = []
		for (const item of e.target) {
			if(item.value && item.checked){lessonBuf.push(parseInt(item.value))}
		}
		setSelectedLessonIds(lessonBuf)
	}

	const handleTest = () => {

	}

	return (
		<>
			<form className="mn-flex-column mn-gap-medium" onSubmit={onSubmit}>
				<div className="mn-flex-row mn-justify-space-between">
					<h2>Lessons</h2>
					<Button
						type="submit"
					>
						{' '}
						Test{' '}
					</Button>
				</div>
				<div className="mn-flex-column mn-gap-small">
					{lessons
						? lessons.map((lesson) => <TestLesson lesson={lesson} key={lesson.id}/>)
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
						cancel={() => {setTakeTest(false)}}
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
			<input type="checkbox" value={lesson.id} ref={checkbox} />
			<div> {lesson.index + 1}. </div>
			<div className="mn-flex-row mn-gap-large mn-grow mn-justify-space-between mn-text-padding mn-border-left">
				<p> {lesson.title} </p>
				<div className="mn-flex-row mn-gap-x-large">
					<p className="mn-is-inactive">{lesson.questionCount} questions</p>
					<div>{lesson.mark}%</div>
				</div>
			</div>
		</div>
	)
}

export default TestLessonWrapper
