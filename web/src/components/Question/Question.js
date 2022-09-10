import QuestionAnswer from 'src/components/QuestionAnswer'
import { FiPlusSquare } from 'react-icons/fi'
import { FiXCircle, FiCheckCircle, FiMinusSquare } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { DELETE_QUESTION } from 'src/shared/queries'
import { useMutation } from '@apollo/client'

const Question = ({
	question,
	deleteAnswer,
	createAnswer,
	setQuestionSelect,
	handleDelet = null,
}) => {
	const [active, setActive] = useState(false)
	const { currentUser } = useAuth()
	const [deleteQuestion, {}] = useMutation(DELETE_QUESTION)

	const submitDelete = () => {
		deleteQuestion({
			variables: {
				userId: currentUser.id,
				questionId: question.id,
			},
		}).then((response) => {
			if (handleDelete) {
				handleDelete(question)
			}
		})
	}

	const incorrectQuestions = question.multiple ? (
		<div className="incorrect">
			<div className="icon">
				<FiXCircle />
			</div>
			{question.answers
				.filter((e) => {
					return e.correct == false
				})
				.map((e, i) => {
					return (
						<QuestionAnswer
							title={e.answer}
							correct={false}
							handleDelete={deleteAnswer}
						/>
					)
				})}
			<div className="add">
				<FiPlusSquare onClick={() => setQuestionSelect(question.id)} />
			</div>
		</div>
	) : (
		''
	)

	const questionIcon = question.multiple ? (
		<div className="multiple">
			<span>
				<p>M</p>
			</span>
			<span>
				<p>{question.choices}</p>
			</span>
		</div>
	) : (
		<div className="word">
			<p>W</p>
		</div>
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
					<p className="title">{question.question}</p>
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
					{question.answers
						.filter((e) => {
							return e.correct
						})
						.map((e, i) => {
							return (
								<QuestionAnswer
									title={e.answer}
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
