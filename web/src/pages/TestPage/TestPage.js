import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import CourseNavBar from 'src/components/CourseNavBar'
import TestLessonWrapper from 'src/components/TestLessonWrapper'

const TestPage = ({courseId}) => {
	const { currentUser } = useAuth()
	return (
		<>
			<MetaTags title="Test" description="Test page" />
			<CourseNavBar courseId={courseId} />
			<div className="mn-page-height-100">
				<TestLessonWrapper courseId={courseId} userId={currentUser.id} />
			</div>
		</>
	)
}

export default TestPage
