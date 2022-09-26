import { MetaTags } from '@redwoodjs/web'
import NavBar from 'src/components/NavBar'
import QuestionWrapper from 'src/components/QuestionWrapper'
import CourseNavBar from 'src/components/CourseNavBar'

const CourseQuestionPage = ({courseId}) => {
	return (
		<>
			<MetaTags title="CourseQuestion" description="CourseQuestion page" />
			<CourseNavBar courseId={courseId} />
			<QuestionWrapper courseId={parseInt(courseId)} />
		</>
	)
}

export default CourseQuestionPage
