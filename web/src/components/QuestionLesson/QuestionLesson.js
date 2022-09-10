import Question from 'src/components/Question'
import IconButton from 'src/components/IconButton'
import { FiPlusSquare } from 'react-icons/fi'

const QuestionLesson = ({
	lesson,
	deleteAnswer,
	deleteQuestion,
	createQuestion,
	createAnswer,
	setLessonSelect,
	setQuestionSelect,
	toggleQuestionForm,
	toggleAnswerForm,
	returnQuestion
}) => {
	const showUnsorted =
		lesson.id == null && lesson.questions == [] ? false : true

	return (
		<div className="mn-c-question-lesson">
			<div className="lesson-bar">
				<div className="lesson-index">
					<p>{lesson.index}</p>
				</div>
				<div className="lesson-title">
					<p>{lesson.title == null ? 'Unsorted' : lesson.title}</p>
				</div>
			</div>
			<div className="question-container">
				{lesson.questions.map((question) => {
					return (
						<Question
							question={question}
							setQuestionSelect={setQuestionSelect}
						/>
					)
				})}
				{lesson.id != null ? (
					<div className="add" onClick={() => {setLessonSelect(lesson.id); toggleQuestionForm()}}>
						<FiPlusSquare />
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default QuestionLesson
