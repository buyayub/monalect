import TextInput from 'src/components/TextInput'
import Dropdown from 'src/components/Dropdown'
import Button from 'src/components/Button'
import { useMutation } from '@apollo/client'
import { createQuestion } from 'src/controller/question'
import { cache } from 'src/shared/cache'
import { useApolloClient } from '@apollo/client'

import { useState } from 'react'

const QuestionForm = ({
	cancel,
	returnQuestion = null,
	currentUser,
	courseId,
	lessonSelect,
	update
}) => {
	const [questionType, setQuestionType] = useState()
	const client = useApolloClient()

	const onSubmit = (e) => {
		e.preventDefault()

		const questionType = e.target[0].value
		const question = e.target[1].value

		let choices = null
		if (questionType == 'multiple') {
			choices = parseInt(e.target[2].value)
			e.target[2].value = ''
		}

		e.target[1].value = ''
		submitQuestion(questionType, question, choices)
		cancel()
	}

	const submitQuestion = (questionType, question, choices = null) => {
		let input = {}
		const { prev: localId } = cache.apply('unique-id', (val) => val + 1)

		if (questionType == 'multiple') {
			input = {
				id: localId,
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: true,
				choices: choices,
				answers: []
			}
		} else if (questionType == 'word') {
			input = {
				id: localId,
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: false,
				answers: []
			}
		}

		returnQuestion(input)

		input.localId = input.id
		delete input.id

		createQuestion(
				client,
				currentUser.id,
				courseId,
				input,
		).then((record) => {
			update(record[0].local, record[0].real)		
		})

	}

	return (
		<form
			className="mn-flex-column mn-form-width-medium mn-gap-medium"
			onSubmit={onSubmit}
			autoComplete={false}
			onReset={(e) => {
				setQuestionType('word')
			}}
		>
			<Dropdown
				required
				selected="word"
				label="Type"
				items={[
					{ title: 'Word', value: 'word' },
					{ title: 'Multiple Choice', value: 'multiple' },
				]}
				onChange={(e) => {
					setQuestionType(e.target.value)
				}}
			/>
			<TextInput label="Question" name="question" />
			{questionType == 'multiple' ? (
				<TextInput
					required
					label="Choices"
					className="mn-is-numeric"
					inputmode="numeric"
				/>
			) : (
				''
			)}
			<div className="mn-flex-row mn-gap-medium mn-align-self-center">
				<Button
					className="mn-is-secondary"
					type="reset"
					onClick={(e) => {
						cancel()
					}}
				>
					Cancel
				</Button>
				<Button className="" type="submit">
					{' '}
					Add{' '}
				</Button>
			</div>
		</form>
	)
}

export default QuestionForm
