import { useQuery, useMutation } from '@apollo/client'
import { useState, useRef, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import TextInput from 'src/components/TextInput'
import IconButton from 'src/components/IconButton'
import QuestionAnswerForm from 'src/components/QuestionAnswerForm'
import Dropdown from 'src/components/Dropdown'
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import QuestionAnswer from 'src/components/QuestionAnswer'
import { GET_LESSONS, CREATE_QUESTION } from 'src/shared/queries'

const QuestionFullForm = ({
	userId = null,
	courseId = null,
	cancel,
	lessonSelected = null,
}) => {
	const [questionType, setQuestionType] = useState('word')
	const [answers, setAnswers] = useState([])
	const [answerKey, setAnswerKey] = useState(0)
	const [showForm, setShowForm] = useState(false)
	const [createQuestion] = useMutation(CREATE_QUESTION)

	const timeout = 2
	const [timer, setTimer] = useState(0)

	// Timer
	useEffect(() => {
		let interval = null

		if (timer > 0) {
			interval = setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)
		}

		return () => {
			window.clearTimeout(interval)
		}
	}, [timer])

	// Create queury for the lessons to populate the lessons dropdown
	const {
		loading,
		error,
		data: lessonData,
	} = useQuery(GET_LESSONS, {
		variables: {
			userId: userId,
			courseId: courseId,
		},
	})

	if (loading) {
		return `Loading...`
	}

	if (error) {
		return `ERROR  ${error}`
	}

	// organize lesson data into items for dropdown
	let lessonItems = []
	if (lessonData.lessons) {
		for (const lesson of lessonData.lessons) {
			lessonItems.push({
				title: `${lesson.index}:  ${lesson.title}`,
				value: lesson.id,
			})
		}
	}

	// submit form
	const onSubmit = (e) => {
		e.preventDefault()
		const lessonId = parseInt(e.target[0].value)
		const multiple = e.target[1].value == 'multiple'
		const question = e.target[2].value
		let choices = null

		if (multiple) {
			choices = parseInt(e.target[3].value)
		}

		let questionAnswers = []

		for (const answer of answers) {
			if (multiple) {
				questionAnswers.push({
					answer: answer.answer,
					correct: answer.correct,
				})
			} else if (!multiple && answer.correct) {
				questionAnswers.push({
					answer: answer.answer,
					correct: answer.correct,
				})
			}
		}

		createQuestion({
			variables: {
				userId: userId,
				input: {
					courseId: courseId,
					lessonId: lessonId,
					question: question,
					multiple: multiple,
					choices: choices,
					answers: questionAnswers,
				},
			},
		})

		// reset form
		e.target[2].value = ''
		setAnswers([])
		setAnswerKey(0)
		if (multiple) {
			e.target[3].value = ''
		}

		// start temporary "created" message
		setTimer(timeout)
	}

	return (
		<form
			className="mn-form-width-medium mn-form-middle mn-flex-column mn-gap-small"
			onSubmit={onSubmit}
			autoComplete={false}
		>
			<Dropdown
				label="Lesson"
				items={lessonItems}
				className="mn-is-long"
				selected={lessonSelected}
			/>
			<Dropdown
				label="Type"
				items={[
					{
						title: 'Word',
						value: 'word',
					},
					{
						title: 'Multiple Choice',
						value: 'multiple',
					},
				]}
				className="mn-is-long"
				selected="word"
				onChange={(e) => {
					setQuestionType(e.target.value)
				}}
			/>
			<TextInput label="Question" required={true} />
			{questionType == 'multiple' ? (
				<TextInput label="Choices" className="mn-is-numeric" required={true} />
			) : (
				''
			)}
			<div className="mn-flex-column mn-gap-medium mn-padding-bottom-medium">
				<p>Answers</p>
				<div className="mn-flex-column mn-gap-small">
					<CustomAnswerForm
						answers={answers}
						answerKey={answerKey}
						setAnswerKey={setAnswerKey}
						setAnswers={setAnswers}
					/>
					{questionType == 'multiple' ? (
						<CustomAnswerForm
							answers={answers}
							answerKey={answerKey}
							setAnswerKey={setAnswerKey}
							setAnswers={setAnswers}
							correct={false}
						/>
					) : (
						''
					)}
				</div>
			</div>
			<div className="mn-flex-row mn-align-self-center mn-gap-medium">
				<Button className="mn-is-secondary" onClick={cancel}>
					Close
				</Button>
				<Button type="submit" className="mn-is-primary">
					Create
				</Button>
			</div>
			<div className="mn-align-self-center">{timer > 0 ? 'Created' : ''}</div>
		</form>
	)
}

const CustomAnswerForm = ({
	cancel,
	answers = [],
	setAnswers,
	submitAnswer,
	answerKey = 0,
	setAnswerKey = null,
	correct = true,
}) => {
	const [inputToggle, setInputToggle] = useState(false)
	const inputForm = useRef(null)

	// focus selection on text input if it's toggled to edit
	useEffect(() => {
		if (inputForm && inputToggle) {
			inputForm.current.focus()
		}
	}, [inputToggle])

	// handle keyboard input from text input to add submit and escape functionality
	const inputKeyPress = (e) => {
		if (e.key == 'Enter') {
			e.preventDefault()
			addAnswer(e.target.textContent)
			e.target.textContent = ''
		}

		if (e.key == 'Escape') {
			e.preventDefault()
			setInputToggle(!inputToggle)
		}
	}

	// add answer to answers array
	const addAnswer = (answer) => {
		let answersCopy = JSON.parse(JSON.stringify(answers))
		answersCopy.push({
			answer: answer,
			correct: correct,
			key: answerKey,
		})
		setAnswers([...answersCopy])
		setAnswerKey(answerKey + 1)
	}

	const deleteAnswer = (key) => {
		let answersCopy = JSON.parse(JSON.stringify(answers))
		answersCopy = answersCopy.filter((e) => {
			return e.key != key
		})
		setAnswers([...answersCopy])
	}

	return (
		<div className="mn-flex-column mn-gap-small ">
			<div className="mn-flex-row mn-gap-medium mn-align-center mn-flex-wrap">
				{correct ? (
					<FiCheckCircle className="mn-icon-small mn-icon-thick mn-is-correct" />
				) : (
					<FiXCircle className="mn-icon-small mn-icon-thick mn-is-incorrect" />
				)}
				{answers
					.filter((e) => {
						if (correct) {
							return e.correct
						} else {
							return !e.correct
						}
					})
					.map((e, i) => {
						return (
							<div
								className={`mn-flex-row mn-gap-small mn-clickable ${
									correct ? 'mn-is-correct' : 'mn-is-incorrect'
								}`}
							>
								<div className="main">
									<p>{e.answer}</p>
								</div>
								<IconButton
									onClick={(element) => {
										element.preventDefault()
										deleteAnswer(e.key)
									}}
									className="mn-is-danger mn-is-small mn-is-soft"
								>
									<FiX />
								</IconButton>
							</div>
						)
					})}
				<div
					className={`mn-text-underline mn-flex-row mn-clickable ${
						correct ? 'mn-is-correct' : 'mn-is-incorrect'
					} ${inputToggle ? 'mn-is-hidden' : ''}`}
					onClick={() => {
						setInputToggle(!inputToggle)
					}}
				>
					<FiPlus />
					<p>Add</p>
				</div>
				<span
					className={`mn-c-text-input ${!inputToggle ? 'mn-is-hidden' : ''}`}
					contentEditable={true}
					ref={inputForm}
					onKeyDown={inputKeyPress}
					onBlur={(e) => {
						console.log(e)
						if (e.target.textContent.replace(/\s/g, '').length)
							addAnswer(e.target.textContent)
						setInputToggle(!inputToggle)
						e.target.innerText = ''
					}}
					autoFocus
				></span>
			</div>
		</div>
	)
}

export default QuestionFullForm
