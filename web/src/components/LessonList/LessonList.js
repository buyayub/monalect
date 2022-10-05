import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { useParams } from '@redwoodjs/router'
import { useState, useLayoutEffect } from 'react'
import { getLessonList } from 'src/models/lesson'
import LessonBlock from 'src/components/LessonBlock'

const LessonList = ({ courseId }) => {
	const [lessons, setLessons] = useState(null)
	const [id, setId] = useState(courseId)

	if (!lessons || id != courseId) {
		getLessonList(courseId).then((data) => {
			setLessons(data)
			setId(courseId)
		})
	}

	return (
		<div className="mn-flex-column mn-gap-small mn-layout-half">
			{!lessons
				? 'Loading...'
				: lessons.map((lesson, i) => {
						return <LessonBlock lesson={lesson} />
				  })}
		</div>
	)
}

export default LessonList
