import { MetaTags } from '@redwoodjs/web'
import NavBar from 'src/components/NavBar'
import QuestionWrapper from 'src/components/QuestionWrapper'

const CourseQuestionPage = ({courseId}) => {
	return (
		<>
			<MetaTags title="CourseQuestion" description="CourseQuestion page" />
			<NavBar courseId={courseId} />
			<QuestionWrapper courseId={parseInt(courseId)} />
		</>
	)
}

export default CourseQuestionPage
