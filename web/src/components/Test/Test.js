import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect, useRef } from 'react'
import { LOAD_QUESTIONS, CREATE_TEST } from 'src/shared/queries'
import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'

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
}) => {
	const {
		data: questionLessons,
		loading,
		error,
	} = useQuery(LOAD_QUESTIONS, {
		variables: { userId: userId, courseId: parseInt(courseId) },
	})

	const [createTest] = useMutation(CREATE_TEST)

	const [timer, setTimer] = useState(null)
	const [questions, setQuestions] = useState(null)

	// filter for selected lessons, and expand questions into a single array, then randomize the questions
	useEffect(() => {
		if (questionLessons && selectedLessonIds) {
			let lessons = questionLessons.questionsByLesson.filter((lesson) =>
				selectedLessonIds.includes(lesson.id)
			)

			let questionData = []
			for (const lesson of lessons) {
				questionData = questionData.concat(lesson.questions)
			}
			randomizeArray(questionData)
			setQuestions(questionData)
		}
	}, [questionLessons])

	// split this up some day
	const onSubmit = (e) => {
		e.preventDefault()

		// we'll create a new array that contains the questions, but with a new attribute stating if they got it correct or not
		// we'll also gather the lesson marks
		let testQuestions = []
		let lessonMarks = []
		for (let element of e.target) {
			if (element.type != 'text' && element.type != 'radio') continue

			console.log(element)
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
				console.log('yoyo')
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
			})

			totalCount += count
			totalCorrect += correct
		}

		// submit the test

		createTest({
			variables: {
				userId: userId,
				input: {
					count: totalCount,
					correct: totalCorrect,
					quiz: false,
					courseId: parseInt(courseId),
					tests: lessonMarks,
				},
			},
		})	
	}

	// the disabled and hidden button at the start is to prevent 'enter' from submitting the form
	return (
		<form
			className="mn-flex-column mn-gap-x-large mn-width-75vw"
			onSubmit={onSubmit}
			autoComplete="off"
		>
			<button
				type="submit"
				disabled
				style={{ display: 'none' }}
				aria-hidden="true"
			></button>
			<div className="mn-flex-row mn-justify-space-between">
				<h2>{'Test'}</h2>
				<div className="mn-flex-row mn-gap-medium">
					<Button className="mn-is-danger" onClick={cancel}>
						{' '}
						Cancel{' '}
					</Button>
					<Button type="submit"> Submit </Button>
				</div>
			</div>
			<div className="mn-flex-column mn-gap-x-large">
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
	const multipleAnswers = (answers, choices) => {
		let correctAnswers = answers.filter((answer) => answer.correct)
		let incorrectAnswers = answers.filter((answer) => !answer.correct)

		let newAnswers = [
			correctAnswers[Math.floor(Math.random() * correctAnswers.length)],
		] // selects a random correct answer

		// array of random numbers within number of choices
		let nums = Array.from(Array(incorrectAnswers.length - 1).keys())

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

	return (
		<div className="mn-flex-column mn-gap-medium">
			<h4>
				{index + 1}. {question.question}
			</h4>
			{question.multiple ? (
				multipleAnswers(question.answers, question.choices)
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

export default Test
