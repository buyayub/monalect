import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import NavBar from 'src/components/NavBar'
import CourseTitleCell from 'src/components/CourseTitleCell'
import LessonDisplayCell from 'src/components/LessonDisplayCell'

const CourseHomePage = ({
	courseId,
	courseTitle,
	notebookWords,
	questionCount,
}) => {
	const { currentUser } = useAuth()

	return (
		<>
			<MetaTags title="CourseHome" description="CourseHome page" />
			<NavBar courseId={courseId} />
			<div className="mn-main-layout mn-flex-column mn-gap-medium">
				{!(courseTitle == undefined || questionCount == undefined) ? (
					<div className="mn-c-header mn-flex-row mn-gap-medium">
						<h2>{courseTitle}</h2>
						<div className="mn-flex-row mn-gap-small mn-align-end">
							<span className="mn-flex-row mn-gap-small">
								<FiHelpCircle />
								<h4>{notebookWords == null ? 0 : notebookWords}</h4>
							</span>
							<span className="mn-flex-row mn-gap-small">
								<RiBook2Line />
								<h4>{questionCount}</h4>
							</span>
						</div>
					</div>
				) : (
					<CourseTitleCell courseId={parseInt(courseId)} />
				)}
				<LessonDisplayCell
					courseId={parseInt(courseId)}
					userId={currentUser.id}
				/>
			</div>
		</>
	)
}

export default CourseHomePage
