import { FiUser, FiHome } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'
import { Link, routes } from '@redwoodjs/router'

const CourseLayout = ({ children }) => {
	return (
		<>
			<header>
				<nav class="mn-c-nav">
					<ul>
						<li>
							<Link to={routes.home()}>Home</Link>
						</li>
					</ul>
				</nav>
			</header>
			{children}
		</>
	)
}

export default CourseLayout
