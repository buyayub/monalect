import { getCourseCard } from 'src/views/courseCard'
import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { useState, useLayoutEffect, useMemo } from 'react'
import React from 'react'

const CourseTitle = ({ courseId }) => {
	const [card, setCard] = useState(undefined)
	const [id, setId] = useState(courseId)

	if (!card || id != courseId) {
		getCourseCard(courseId).then((data) => {
			setCard(data)
			setId(courseId)
		})
	}

	return (
		<div className="mn-c-course-header mn-align-center mn-flex-row mn-justify-space-between">
			<div className="mn-flex-row mn-gap-small mn-align-end">
				<h2>{!card ? 'loading' : card.title ? card.title : 'Untitled'}</h2>
				<div className="mn-flex-row mn-gap-small">
					<span className="mn-flex-row mn-gap-small">
						<RiBook2Line />
						<h4>{!card ? '.' : card.notebookWords ? card.notebookWords : 0}</h4>
					</span>
					<span className="mn-flex-row mn-gap-small">
						<FiHelpCircle />
						<h4>{!card ? '.' : card.questionCount ? card.questionCount : 0}</h4>
					</span>
				</div>
			</div>
			<h2>{!card ? '.' : card.mark ? 0 : card.mark}%</h2>
		</div>
	)
}

export default CourseTitle
