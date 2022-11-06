import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { CourseNavBar, TestLessonWrapper } from 'src/components'

const TestPage = ({courseId}) => {
	const { currentUser } = useAuth()
	return (
		<>
			<MetaTags title="Test" description="Test page" />
			<CourseNavBar courseId={courseId} />
			<div className="mn-page-height-100 mn-padding-page">
				<div className="mn-width-50">
					<TestLessonWrapper courseId={courseId} userId={currentUser.id} />
				</div>
			</div>
		</>
	)
}

export default TestPage
