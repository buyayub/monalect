import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import CourseNavBar from 'src/components/CourseNavBar'
import CourseTitleCell from 'src/components/CourseTitleCell'
import LessonDisplayCell from 'src/components/LessonDisplayCell'

const CourseHomePage = ({
	courseId,
	courseTitle,
	notebookWords,
	questionCount,
	mark,
}) => {
	const { currentUser } = useAuth()

	return (
		<>
			<MetaTags title="CourseHome" description="CourseHome page" />
			<CourseNavBar courseId={courseId} userId={currentUser.id} />
			<div className="mn-main-layout mn-flex-column mn-gap-medium mn-padding-page mn-page-height-100">
				{!(courseTitle == undefined || questionCount == undefined) ? (
					<div className="mn-c-course-header mn-align-center mn-flex-row mn-justify-space-between">
						<div className="mn-flex-row mn-gap-small mn-align-end">
							<h2>{courseTitle == '' ? 'Untitled' : courseTitle}</h2>
							<div className="mn-flex-row mn-gap-small">
								<span className="mn-flex-row mn-gap-small">
									<RiBook2Line />
									<h4>{notebookWords == null ? 0 : notebookWords}</h4>
								</span>
								<span className="mn-flex-row mn-gap-small">
									<FiHelpCircle />
									<h4>{questionCount}</h4>
								</span>
							</div>
						</div>
						<h2>{mark}%</h2>
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
