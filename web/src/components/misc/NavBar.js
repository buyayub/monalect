import { FiUser, FiHome } from 'react-icons/fi'
import { useState } from 'react'
import { NavLink, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { FiMenu, FiBook, FiHelpCircle } from 'react-icons/fi'

import { IconButton } from 'src/components'

const NavBar = ({ courseId, className }) => {
	return (
		<nav className={`mn-c-nav mn-flex-row mn-align-center mn-gap-large ${className}`}>
			<div className="mn-flex-row mn-align-center mn-gap-small">
				<img alt="monalect logo" className="mn-logo-small" src="/monalogo.png" />
				<p className="mn-logo-text mn-font-serif">monalect</p>
			</div>
			<ul className="mn-flex-row mn-align-center">
				<li>
					<NavLink activeClassName="mn-active-text" to={routes.home()}>Courses</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
