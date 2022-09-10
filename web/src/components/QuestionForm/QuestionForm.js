import TextInput from 'src/components/TextInput'
import Dropdown from 'src/components/Dropdown'
import Button from 'src/components/Button'
import { useMutation } from '@apollo/client'

import { CREATE_QUESTION } from 'src/shared/queries'

import { useState } from 'react'

const QuestionForm = ({ cancel, returnQuestion=null, currentUser, courseId, lessonSelect}) => {
	const [questionType, setQuestionType] = useState()
	const [createQuestion] = useMutation(CREATE_QUESTION)

	const onSubmit = (e) => {
		e.preventDefault()

		const questionType = e.target[0].value
		const question = e.target[1].value

		let choices = null
		if (questionType == "multiple")
			choices = parseInt(e.target[2].value);
		
		submitQuestion(questionType, question, choices)
		cancel()
	}

	const submitQuestion = (questionType, question, choices = null) => {
		let input = {}


		if (questionType == 'multiple') {
			input = {
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: true,
				choices: choices,
			}
		}

		else if (questionType == 'word') {
			input = {
				courseId: courseId,
				lessonId: lessonSelect,
				question: question,
				multiple: false,
			}
		}


		createQuestion({
			variables: {
				userId: currentUser.id,
				input: input,
			},
		}).then((response) => {
			const question = response.data.createQuestion
			if (returnQuestion) {
				returnQuestion(question)				
			}
		})
	}

	return (
		<form className="mn-c-question-form" onSubmit={onSubmit}>
			<Dropdown
				selected="word"
				items={[
					{ title: 'Word', value: 'word' },
					{ title: 'Multiple', value: 'multiple' },
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
			<Button
				className="mn-is-secondary mn-is-small"
				type="reset"
				onClick={cancel}
			>
				Cancel
			</Button>
			<Button className="mn-is-small" type="submit">
				{' '}
				Add{' '}
			</Button>
		</form>
	)
}

export default QuestionForm
