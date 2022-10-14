import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect, useRef } from 'react'
import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'
import { createTest } from 'src/controller/test/'
import { useApolloClient } from '@apollo/client'
import { getQuestionLessons } from 'src/models/question'
import { cache } from 'src/shared/cache'

const randomizeArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

const Test = ({
	selectedLessonIds = null,
	userId = null,
	courseId = null,
	cancel = null,
	updateLessons = null,
}) => {
	const [questions, setQuestions] = useState(undefined)
	const submitForm = useRef(null)
	const client = useApolloClient()

	// filter for selected lessons, and expand questions into a single array, then randomize the questions
	if (!questions) {
		getQuestionLessons(courseId).then((list) => {
			let lessons = list.filter((lesson) =>
				selectedLessonIds.includes(lesson.id)
			)

			let questionData = []
			for (const lesson of lessons) {
				questionData = questionData.concat(lesson.questions)
			}
			randomizeArray(questionData)
			setQuestions(questionData)
		})
	}

	// TIMER

	// split this up some day
	const onSubmit = (e) => {
		e.preventDefault()

		// we'll create a new array that contains the questions, but with a new attribute stating if they got it correct or not
		// we'll also gather the lesson marks
		let testQuestions = []
		let lessonMarks = []
		for (let element of e.target) {
			if (element.type != 'text' && element.type != 'radio') continue

			let value = element.value
			let correct = false
			let inside = false
			let index = parseInt(element.name)

			// see if answer inside array, we convert the answer into lowercase, spaceless form in comparison
			for (let answer of questions[index].answers) {
				if (value == answer.answer.toLowerCase().replace(/ /g, '')) {
					inside = answer.correct
					break
				}
			}

			// if it's radio and a valid answer, it's correct if it's checked
			if (inside && element.type == 'radio') {
				correct = element.checked ? true : null
			} else if (inside && element.type == 'text') {
				correct = true
			}
			// If it's not checked, and it's incorrect, then count it as null for later

			if (!inside && element.type == 'radio' && !element.checked) {
				correct = null
			}

			// push question into array
			testQuestions.push({
				...questions[index],
				correct: correct,
				inside: inside,
			})
		}

		// get correct counts
		let totalCount = 0
		let totalCorrect = 0
		for (let lesson of selectedLessonIds) {
			// calculation for iterative mean
			let count = 0
			let correct = 0
			for (let question of testQuestions) {
				if (lesson == question.lessonId && question.correct != null) {
					correct += question.correct
					count++
				}
			}

			lessonMarks.push({
				lessonId: lesson,
				correct: correct,
				count: count,
				date: JSON.stringify(Date.now())
			})

			totalCount += count
			totalCorrect += correct
		}

		const { prev: localId } = cache.apply('unique-id', (val) => val + 1)
		// submit the test
		// update the lesson marks and exit
		const input = {
			id: localId,
			count: totalCount,
			correct: totalCorrect,
			date: JSON.stringify(Date.now()),
			quiz: false,
			courseId: parseInt(courseId),
			tests: lessonMarks,
		}
		createTest(client, userId, courseId, input)


		updateLessons(lessonMarks)
		cancel()
	}
	// the disabled and hidden button at the start is to prevent 'enter' from submitting the form
	return (
		<form
			className="mn-flex-column mn-gap-medium mn-width-75vw mn-height-75"
			onSubmit={onSubmit}
			autoComplete="off"
		>
			<button
				type="submit"
				disabled
				style={{ display: 'none' }}
				aria-hidden="true"
			></button>
			<div className="mn-flex-row mn-justify-space-between mn-align-center">
				<h2>{'Test'}</h2>
				<div className="mn-flex-row mn-gap-medium mn-align-center">
					<Timer
						questions={questions}
						trigger={() => {
							submitForm.current.click()
						}}
					/>
					<Button className="mn-is-danger" onClick={cancel}>
						{' '}
						Cancel{' '}
					</Button>
					<button ref={submitForm} type="submit" className="mn-c-button">
						Submit
					</button>
				</div>
			</div>
			<div className="mn-flex-column mn-gap-x-large mn-scrollable">
				{questions
					? questions.map((question, i) => (
							<Question question={question} index={i} key={i} />
					  ))
					: ''}
			</div>
		</form>
	)
}

const Question = ({ question, index }) => {
	// Function: generate multiple choice answer form

	return (
		<div className="mn-flex-column mn-gap-medium">
			<h4>
				{index + 1}. {question.question}
			</h4>
			{question.multiple ? (
				<MultipleChoice
					answers={question.answers}
					choices={question.choices}
					index={index}
				/>
			) : (
				<TextInput
					className="mn-form-width-medium mn-indent"
					name={index}
					label="Answer:"
				/>
			)}
		</div>
	)
}

const MultipleChoice = ({ answers, choices, index }) => {
	let correctAnswers = answers.filter((answer) => answer.correct)
	let incorrectAnswers = answers.filter((answer) => !answer.correct)

	let newAnswers = [
		correctAnswers[Math.floor(Math.random() * correctAnswers.length)],
	] // selects a random correct answer

	// array of random numbers within number of choices
	let nums = Array.from(Array(incorrectAnswers.length).keys())

	// shuffle the array using function defined globally at top
	randomizeArray(nums)

	// push the stuff onto the answers list
	for (let i = 0; i < choices - 1 && i < incorrectAnswers.length; i++) {
		newAnswers.push(incorrectAnswers[nums[i]])
	}

	// shuffle the answers again
	randomizeArray(newAnswers)

	return newAnswers.map((answer, i) => {
		return (
			<div
				className="mn-flex-row mn-indent mn-gap-medium"
				key={`answer${index}_${i}`}
			>
				<input
					type="radio"
					className="mn-indent mn-clickable"
					name={index}
					id={`answer${index}_${i}`}
					value={answer.answer.toLowerCase().replace(/ /g, '')}
				/>
				<label htmlFor={`answer${index}_${i}`} className="mn-clickable">
					{answer.answer}
				</label>
			</div>
		)
	})
}

const Timer = ({ trigger = null, questions }) => {
	const [timer, setTimer] = useState()
	useEffect(() => {
		let interval = null
		if (timer > 0) {
			interval = setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)
		}

		if (timer == 0) {
			trigger()
		}

		return () => {
			window.clearTimeout(interval)
		}
	}, [timer])

	useEffect(() => {
		if (!timer) {
			setTimer(questions ? questions.length * 90 : undefined)
		}
	})

	return (
		<h3>
			{timer
				? new Date(timer * 1000).toISOString().substr(11, 8)
				: 'loading...'}
		</h3>
	)
}

export default Test
