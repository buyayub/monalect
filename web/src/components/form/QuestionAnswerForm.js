import { FiPlus } from 'react-icons/fi'
import { FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'

const QuestionAnswerForm = ({ answers=[], setAnswers, multiple = true, deleteAnswer}) => {

	const incorrectQuestions = multiple ? (
		<div className="mn-is-incorrect mn-flex-row mn-gap-medium mn-indent mn-align-center">
			<FiXCircle className="mn-icon-small mn-icon-thick" />
			{answers
				.filter((e) => {
					return !e.correct
				})
				.map((e, i) => {
					return (
						<QuestionAnswer
							title={e.answer}
							correct={false}
							handleDelete={deleteAnswer}
							answer={{
								id: e.id,
							}}
						/>
					)
				})}
			<div
				className="mn-text-underline mn-flex-row mn-align-center mn-clickable"
				onClick={() => {
					toggleAnswerForm()
					setAnswerType(false) // answer type incorrect
				}}
			>
				<FiPlus />
				Add
			</div>
		</div>
	) : (
		''
	)

	return (
		<div className="mn-flex-column mn-gap-small ">
			<div
				className={
					'mn-flex-column mn-gap-small ' 
				}
			>
				<div className="mn-flex-row mn-indent mn-gap-medium">
					<FiCheckCircle className="mn-icon-small mn-icon-thick mn-is-correct" />
					{answers
						.filter((e) => {
							return e.correct
						})
						.map((e, i) => {
							return (
								<QuestionAnswer
									title={e.answer}
									correct={true}
									handleDelete={deleteAnswer}
									answer={{
										id: e.id,
									}}
								/>
							)
						})}
					<div
						className="mn-is-correct mn-text-underline mn-flex-row mn-clickable"
						onClick={() => {
							toggleAnswerForm()
							setAnswerType(true) // answer type correct
						}}
					>
						<FiPlus />
						<p>Add</p>
					</div>
				</div>
				{incorrectQuestions}
			</div>
		</div>
	)
}

export default QuestionAnswerForm
