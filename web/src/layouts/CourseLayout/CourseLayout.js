import { FiUser, FiHome } from 'react-icons/fi';
import IconButton from 'src/components/IconButton';

const CourseLayout = ({ children }) => {
	return ( 
	
		<>
			<header>
				<nav>
					<IconButton> <FiUser /> </IconButton>
					<IconButton> <FiHome /> </IconButton>
				</nav>
			</header>
			{children}
		</>
	)
}

export default CourseLayout
