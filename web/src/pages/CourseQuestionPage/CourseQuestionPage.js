import { MetaTags } from '@redwoodjs/web'
import { NavBar, QuestionWrapper, CourseNavBar } from 'src/components'

const CourseQuestionPage = ({courseId}) => {
	return (
		<>
			<MetaTags title="CourseQuestion" description="CourseQuestion page" />
			<CourseNavBar courseId={courseId} />
			<div className="mn-height-full mn-main-layout">
				<QuestionWrapper courseId={parseInt(courseId)} />
			</div>
		</>
	)
}

export default CourseQuestionPage
