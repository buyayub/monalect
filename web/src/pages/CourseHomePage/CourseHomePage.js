import { Link, routes } from '@redwoodjs/router'
import { bcMain } from 'src/shared/breadcrumbs'
import { MetaTags } from '@redwoodjs/web'
import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { useState } from 'react'

import NavBar from 'src/components/NavBar'
import CourseTitleCell from 'src/components/CourseTitleCell'

const CourseHomePage = ({
	courseId,
	courseTitle,
	notebookWords,
	questionCount,
}) => {
	bcMain.selected = '/monalect'

	return (
		<>
			<MetaTags title="CourseHome" description="CourseHome page" />
			<NavBar breadcrumbs={[bcMain]} />
			{!(courseTitle == undefined || questionCount == undefined) ? (
				<div id="mn-i-course-title">
					<h2>{courseTitle}</h2>
					<div className="course-stats">
						<span>
							<FiHelpCircle />
							<h4>{notebookWords == null ? 0 : notebookWords}</h4>
						</span>
						<span>
							<RiBook2Line />
							<h4>{questionCount}</h4>
						</span>
					</div>
				</div>
			) : (
				<CourseTitleCell courseId={parseInt(courseId)} />
			)}
		</>
	)
}

export default CourseHomePage
