import { NavLink, routes, navigate } from '@redwoodjs/router'
import { useState } from 'react'
import { getDropdown } from 'src/views/course'
import { NavBar, Dropdown}  from 'src/components'

const CourseNavBar = ({ courseId }) => {
	const [courses, setCourses] = useState(null)

	if (!courses){
		getDropdown().then((data) => {
			setCourses(data)
		})
	}

	return (
		<header className="fade-in mn-c-header mn-padding-header mn-flex-row mn-align-center mn-justify-space-between">
			<div className="mn-flex-row mn-align-center mn-gap-medium">
				<NavBar courseId={courseId} />
				<Dropdown
					className="mn-is-long mn-border-left-light"
					selected={parseInt(courseId)}
					items={courses ? courses : []}
					onChange={(e) => {
						navigate(routes.courseHome({ courseId: e.target.value }))
					}}
				/>
			</div>
			<nav className="mn-c-nav">
				<ul>
					<li>
						<NavLink
							activeClassName="mn-active-text"
							to={routes.courseHome({ courseId: courseId })}
						>
							Overview
						</NavLink>
					</li>
					<li>
						<NavLink
							activeClassName="mn-active-text"
							to={routes.study({ courseId: courseId })}
						>
							Study
						</NavLink>
					</li>
					<li>
						<NavLink
							activeClassName="mn-active-text"
							to={routes.courseQuestion({ courseId: courseId })}
						>
							Questions
						</NavLink>
					</li>
					<li>
						<NavLink
							activeClassName="mn-active-text"
							to={routes.test({ courseId: courseId })}
						>
							Tests
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default CourseNavBar
