import QuestionAnswer from 'src/components/QuestionAnswer'
import IconButton from 'src/components/IconButton'
import Modal from 'src/components/Modal'
import { FiPlus } from 'react-icons/fi'
import { FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { DELETE_QUESTION } from 'src/shared/queries'
import { useMutation } from '@apollo/client'

const Question = ({
	question,
	deleteAnswer,
	createAnswer,
	setLessonSelect,
	setQuestionSelect,
	handleDelete = null,
	toggleAnswerForm = null,
	setAnswerType = null,
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
		})

		if (handleDelete) {
			handleDelete(question)
		}
	}

	const incorrectQuestions = question.multiple ? (
		<div className="mn-is-incorrect mn-flex-row mn-gap-medium mn-indent mn-align-center">
			<FiXCircle className="mn-icon-small mn-icon-thick" />
			{question.answers
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
								questionId: question.id,
							}}
						/>
					)
				})}
			<div
				className="mn-text-underline mn-flex-row mn-align-center mn-clickable"
				onClick={() => {
					toggleAnswerForm()
					setAnswerType(false) // answer type incorrect
					setQuestionSelect(question.id)
					setLessonSelect(question.lessonId)
				}}
			>
				<FiPlus />
				Add
			</div>
		</div>
	) : (
		''
	)

	const questionIcon = question.multiple ? (
		<div className="mn-flex-row mn-gap-small">
			<p>M</p>
			<p className="mn-border-left">&nbsp; {question.choices}</p>
		</div>
	) : (
		<div className="word">
			<p>W</p>
		</div>
	)

	return (
		<div className="mn-flex-column mn-gap-small ">
			<div className="mn-hover mn-clickable mn-flex-row mn-gap-medium mn-justify-space-between">
				<div
					className="mn-flex-row mn-gap-medium"
					onClick={() => {
						setActive(!active)
					}}
				>
					{questionIcon}
					<p className="title">{question.question}</p>
				</div>
				<IconButton
					onClick={submitDelete}
					className="mn-is-danger mn-is-small mn-on-hover"
				>
					<FiX />
				</IconButton>
			</div>
			<div
				className={
					'mn-flex-column mn-gap-small ' + (!active ? 'mn-is-hidden' : '')
				}
			>
				<div className="mn-flex-row mn-indent mn-gap-medium">
					<FiCheckCircle className="mn-icon-small mn-icon-thick mn-is-correct" />
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
									answer={{
										id: e.id,
										questionId: question.id,
									}}
								/>
							)
						})}
					<div
						className="mn-is-correct mn-text-underline mn-flex-row mn-clickable"
						onClick={() => {
							toggleAnswerForm()
							setAnswerType(true) // answer type correct
							setQuestionSelect(question.id)
							setLessonSelect(question.lessonId)
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

export default Question
