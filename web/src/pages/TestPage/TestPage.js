import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import CourseNavBar from 'src/components/CourseNavBar'

const TestPage = ({courseId}) => {
	return (
		<>
			<MetaTags title="Test" description="Test page" />
			<CourseNavBar courseId={courseId} />
		</>
	)
}

export default TestPage
