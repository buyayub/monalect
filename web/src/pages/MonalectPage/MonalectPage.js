import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import CourseCardsCell from 'src/components/CourseCardsCell'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const MonalectPage = () => {
	const { currentUser } = useAuth()

	return (
		<>
			<MetaTags title="Monalect" description="Monalect page" />
			<div className="mn-flex-row mn-justify-space-around">
				<div className="mn-layout-hlf">
					<h2>Community Updates</h2>
					<p>Yo</p>
				</div>
				<div className="mn-flex-column mn-gap-medium">
					<div className="mn-flex-row mn-justify-space-between">
						<h2>Courses</h2>
						<Link to={routes.createCourse()}>
							{' '}
							<Button> Create </Button>
						</Link>
					</div>
					<div className="Active Lessons">
						<CourseCardsCell userId={currentUser.id} />
					</div>
				</div>
			</div>
		</>
	)
}

export default MonalectPage
