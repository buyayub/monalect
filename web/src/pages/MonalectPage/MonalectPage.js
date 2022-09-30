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
			<header className="mn-padding-header mn-flex-row mn-align-center mn-justify-space-between">
				<NavBar />
			</header>
			<div className="mn-flex-row mn-justify-space-around mn-page-height-100 mn-padding-page">
				<div className="mn-layout-half">
					<h2>Community Updates</h2>
					<p>Yo</p>
				</div>
				<div className="mn-layout-half mn-height-full">
					<CourseCardsCell userId={currentUser.id} />
				</div>
			</div>
		</>
	)
}

export default MonalectPage
