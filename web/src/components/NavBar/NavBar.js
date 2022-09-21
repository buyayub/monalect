import { FiUser, FiHome } from 'react-icons/fi'
import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { FiMenu, FiBook, FiHelpCircle } from 'react-icons/fi'

import IconButton from 'src/components/IconButton'

const NavBar = ({ courseId }) => {
	return (
		<nav class="mn-c-nav">
			<ul>
				<li>
					<Link to={routes.courseHome({ courseId: courseId })}>Overview</Link>
				</li>
				<li>
					<Link to={routes.study({ courseId: courseId })}>Study</Link>
				</li>
				<li>
					<Link to={routes.courseQuestion({ courseId: courseId })}>
						Questions
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
