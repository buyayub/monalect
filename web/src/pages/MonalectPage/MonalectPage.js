import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import CourseCardsCell from 'src/components/CourseCardsCell'
import { Link, routes } from '@redwoodjs/router'
import { bcMain } from 'src/shared/breadcrumbs'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const MonalectPage = () => {
	bcMain.selected = '/monalect'
	const { currentUser } = useAuth()

	return (
		<>
			<MetaTags title="Monalect" description="Monalect page" />
			<div>
				<h2>Active</h2>
				<Link to={routes.createCourse()}>
					{' '}
					<Button> Create </Button>
				</Link>
				<div className="Active Lessons">
				<CourseCardsCell userId={currentUser.id}/>
				</div>
			</div>
		</>
	)
}

export default MonalectPage
