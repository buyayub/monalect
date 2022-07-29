import IconButton from 'src/components/IconButton';
import Dropdown from 'src/components/Dropdown';
import LoginForm from 'src/components/LoginForm';
import ProfileSmall from 'src/components/ProfileSmall';

import { FiUser, FiHome } from 'react-icons/fi';
import { useState } from 'react';
import { useLocation, Redirect, navigate, routes} from '@redwoodjs/router';
import { useAuth } from '@redwoodjs/auth'

const NavBar = ({
	breadcrumbs = [],
	icon = null
}) => {
	const {pathname, search, hash} = useLocation()
	const handleChange = (e) => {
		navigate(e.target.value);
	}

	const [login, toggleLogin] = useState(false);
	const { isAuthenticated} = useAuth();
	return (
	  <nav>
		  <IconButton onClick={() => toggleLogin(!login)}> <FiUser /> </IconButton>
		  { !isAuthenticated ?  
			<LoginForm 
			      className={`mn-is-nav-child ` + (login ? "" : "mn-is-hidden")} 
			      cancel={() => toggleLogin(!login)}
			/>
		  : 
		  	<ProfileSmall className={`mn-is-nav-child ` + (login ? "" : "mn-is-hidden")} />
		  }

		  <IconButton> {icon == null ? <FiHome /> : icon} </IconButton>
		  {
		    breadcrumbs.map((breadcrumb, i) => {
			    	var parentClass = ""
			    	if (i < breadcrumbs.length - 1) { parentClass = "mn-is-parent" }
				return <Dropdown key={i} className={parentClass} items={breadcrumb.items} selected={breadcrumb.selected} onChange={handleChange} />
		    })
		  }
	  </nav>
	)
}

export default NavBar
