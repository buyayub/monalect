import NavBar from './NavBar';
import { routes } from '@redwoodjs/router';


const breadcrumbs = [
	{
		selected: "Home",
		items: 
		[
			{
				title: "Home",
				value: routes.home(),
			},
			{
				title: "About",
				value: routes.about(),
			}
		]
	},
	{
		selected: "Register",
		items:
		[
			{
				title: "Register",
				value: routes.register()
			},
		]
	}
]

		
export const generated = () => {
  	return <NavBar breadcrumbs={breadcrumbs} />
}

export default { title: 'Components/NavBar' }
