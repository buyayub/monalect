import { TextInput, Button }from 'src/components'
import { useApolloClient } from '@apollo/client'
import { createAnswer } from 'src/controller/answer'
import { cache } from 'src/lib/cache'

const AnswerForm = ({
	cancel,
	submitAnswer = null,
	questionId = null,
	courseId,
	currentUser,
	answerType,
	setUpdate,
	setRecord	
}) => {
	const client = useApolloClient()

	const onSubmit = async (e) => {
		e.preventDefault()

		const correct = answerType
		const answer = e.target[0].value
		const { prev: localId } = cache.apply('unique-id', (val) => val + 1)
		const input = {
			id: localId,
			questionId: questionId,
			answer: answer,
			correct: correct,
		}

		submitAnswer(input)
		createAnswer(client, currentUser.id, courseId, input).then((record) => {
			setUpdate(true)
			setRecord(record)
		})

		e.target[0].value = ''
		cancel()
	}

	return (
		<form
			className="mn-form-width-medium mn-flex-column mn-gap-large"
			autoComplete="off"
			onSubmit={onSubmit}
		>
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
