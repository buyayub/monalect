import { FiUser, FiHome } from 'react-icons/fi'
import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { FiMenu, FiBook } from 'react-icons/fi'

import IconButton from 'src/components/IconButton'

const NavBar = ({ courseId }) => {
	return (
		<div id="mn-c-navbar">
			<Link to={routes.courseHome({ courseId: courseId })}>
				<IconButton>
					<FiMenu />
				</IconButton>
			</Link>
			<Link to={routes.study({ courseId: courseId })}>
				<IconButton>
					<FiBook />
				</IconButton>
			</Link>
		</div>
	)
}

export default NavBar
