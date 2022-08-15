import QuestionAnswer from 'src/components/QuestionAnswer'
import { FiPlusSquare } from 'react-icons/fi'
import { FiXCircle, FiCheckCircle, FiMinusSquare } from 'react-icons/fi'
import { useState } from 'react'

const Question = ({ question, deleteAnswer, createAnswer, deleteQuestion, setQuestionSelect}) => {
	const [active, setActive] = useState(false)

	const incorrectQuestions =
		question.type == 'multiple' ? (
			<div className="incorrect">
				<div className="icon">
					<FiXCircle />
				</div>
				{question.answers.incorrect.map((e, i) => {
					return (
						<QuestionAnswer
							title={e}
							correct={false}
							handleDelete={deleteAnswer}
						/>
					)
				})}
				<div className="add">
					<FiPlusSquare onClick={() => setQuestionSelect(question.id)}/>
				</div>
			</div>
		) : (
			''
		)

	const questionIcon =
		question.type == 'multiple' ? (
			<div className="multiple">
				<span>
					<p>M</p>
				</span>
				<span>
					<p>{question.choices}</p>
				</span>
			</div>
		) : question.type == 'word' ? (
			<div className="word">
				<p>W</p>
			</div>
		) : (
			''
		)

	return (
		<div className={'mn-c-question ' + (active ? 'mn-is-active' : '')}>
			<div className="question">
				<div
					className="question-title"
					onClick={() => {
						setActive(!active)
					}}
				>
					{questionIcon}
					<p className="title">{question.title}</p>
				</div>
				<div className="question-buttons">
					<div className="button-delete">
						<FiMinusSquare />
					</div>
				</div>
			</div>
			<div className="answers">
				<div className="correct">
					<div className="icon">
						<FiCheckCircle />
					</div>
					{question.answers.correct.map((e, i) => {
						return (
							<QuestionAnswer
								title={e}
								correct={true}
								handleDelete={deleteAnswer}
							/>
						)
					})}
					<div className="add">
						<FiPlusSquare />
					</div>
				</div>
				{incorrectQuestions}
			</div>
		</div>
	)
}

export default Question
