import { FiUser, FiHome } from 'react-icons/fi';
import IconButton from 'src/components/IconButton';
import { Link, routes } from '@redwoodjs/router';

const MainLayout = ({ children }) => {
	return ( 
	
		<>
			<header>
				<nav>
					<IconButton> <FiUser /> </IconButton>
					<Link to={routes.home()}>
						<IconButton> <FiHome /> </IconButton>
					</Link>
				</nav>
			</header>
			{children}
		</>
	)
}

export default MainLayout
