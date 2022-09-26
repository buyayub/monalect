import TextInput from 'src/components/TextInput'
import Button from 'src/components/Button'
import { CREATE_ANSWER } from 'src/shared/queries'
import { useMutation } from '@apollo/client'

const AnswerForm = ({
	cancel,
	submitAnswer = null,
	questionId = null,
	courseId,
	currentUser,
	answerType,
}) => {
	const [createAnswer] = useMutation(CREATE_ANSWER)

	const onSubmit = (e) => {
		e.preventDefault()

		const correct = answerType
		const answer = e.target[0].value

		createAnswer({
			variables: {
				userId: currentUser.id,
				input: {
					questionId: questionId,
					correct: correct,
					answer: answer,
				},
			},
		}).then((response) => {
			const answerResponse = response.data.createAnswer
			submitAnswer(answerResponse)
		})
		e.target[0].value = ""
		cancel()
	}

	return (
		<form className="mn-form-width-medium mn-flex-column mn-gap-large" onSubmit={onSubmit}>
			<TextInput label="Answer" name="answer" />
			<div className="mn-flex-row mn-gap-medium mn-align-self-center">
				<Button className="mn-is-secondary" type="reset" onClick={cancel}>
					Cancel
				</Button>
				<Button type="submit"> Add </Button>
			</div>
		</form>
	)
}

export default AnswerForm
