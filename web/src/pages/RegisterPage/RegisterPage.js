import { NavBar } from 'src/components'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

export const bcMain = [
	{
		selected: "/register",
		items: 
		[
			{
				title: "Home",
				value: routes.home(),
			},
			{
				title: "About",
				value: routes.about(),
			},
			{
				title: "Register",
				value: routes.register(),
			}
		]
	}
]

const RegisterPage = () => {
  return (
    <>
      <MetaTags title="Register" description="Register page" />
	<NavBar breadcrumbs={bcMain} />
    </>
  )
}

export default RegisterPage
