import { NavBar, Button, CourseCardList } from 'src/components'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useContext } from 'react'
import { cache } from 'src/lib/cache'

const MonalectPage = () => {
	const { currentUser } = useAuth()
	cache.size()
	return (
		<>
			<MetaTags title="Monalect" description="Monalect page" />
			<header className="mn-padding-header mn-flex-row mn-align-center mn-justify-space-between">
				<NavBar />
			</header>
			<div className="mn-flex-row mn-justify-space-around mn-page-height-100 mn-padding-page">
				<div className="mn-layout-half">
					<h2>Updates</h2>
					<p>TBD</p>
				</div>
				<div className="mn-layout-half mn-height-full">
					<CourseCardList userId={currentUser.id} key="updatepls" />
				</div>
			</div>
		</>
	)
}

export default MonalectPage
