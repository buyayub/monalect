import { NavLink, routes, navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import NavBar from 'src/components/NavBar'
import Dropdown from 'src/components/Dropdown'
import { useAuth } from '@redwoodjs/auth'

export const QUERY = gql`
	query courseQuery($userId: Int!) {
		courses(userId: $userId) {
			id
			title
		}
	}
`

const CourseNavBar = ({ courseId = null }) => {
	const { currentUser } = useAuth()
	const { data } = useQuery(QUERY, { variables: { userId: currentUser.id } })

	let dropdownData = []
	if (data) {
		data.courses.forEach((e) => {
			dropdownData.push({
				title: e.title,
				value: e.id,
			})
		})
	}

	return (
		<header className="mn-c-header mn-padding-header mn-flex-row mn-align-center mn-justify-space-between">
			<div className="mn-flex-row mn-align-center mn-gap-medium">
				<NavBar courseId={courseId} />
				<Dropdown
					className="mn-is-long mn-border-left-light"
					selected={courseId}
					items={dropdownData}
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
