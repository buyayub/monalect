import Question from 'src/components/Question'
import Button from 'src/components/Button'
import { FiPlusSquare } from 'react-icons/fi'
import { useState } from 'react'

const QuestionLesson = ({
	lesson,
	deleteAnswer,
	handleDelete,
	createQuestion,
	createAnswer,
	setLessonSelect,
	setQuestionSelect,
	toggleQuestionForm,
	toggleAnswerForm,
	setAnswerType,
	returnQuestion,
}) => {
	const showUnsorted =
		lesson.id == null && lesson.questions == [] ? false : true

	const [active, setActive] = useState(false)

	return (
		<div className="mn-flex-column mn-gap-small mn-width-50">
			<div
				onClick={() => {
					setActive(!active)
				}}
				className="mn-flex-row mn-gap-small mn-clickable mn-hover"
			>
				<p className="mn-width-large">{lesson.index != null ? `${lesson.index + 1}.` : ""}</p>
				<div
					className={
						'mn-grow mn-flex-row mn-justify-space-between mn-border-left mn-text-padding mn-align-center ' +
						(active ? 'mn-border-bottom' : '')
					}
				>
					<div className="mn-flex-row mn-gap-large">
						<p>{lesson.title == null ? 'Unsorted' : lesson.title}</p>
						<p className="mn-inactive-text">
							{lesson.questions.length} questions
						</p>
					</div>
					{lesson.id != null ? (
						<Button
							onClick={(e) => {
								e.stopPropagation() // No bubbling
								setLessonSelect(lesson.id)
								toggleQuestionForm()
							}}
							className="mn-is-small mn-is-secondary mn-on-hover"
						>
							Add
						</Button>
					) : (
						''
					)}
				</div>
			</div>
			<div
				className={
					'mn-flex-column mn-gap-small mn-indent-large ' +
					(active ? 'mn-padding-bottom-medium' : 'mn-is-hidden')
				}
			>
				{lesson.questions.map((question) => {
					return (
						<Question
							question={question}
							deleteAnswer={deleteAnswer}
							setQuestionSelect={setQuestionSelect}
							setAnswerType={setAnswerType}
							toggleAnswerForm={toggleAnswerForm}
							createAnswer={createAnswer}
							handleDelete = {handleDelete}
							setLessonSelect={setLessonSelect}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default QuestionLesson
