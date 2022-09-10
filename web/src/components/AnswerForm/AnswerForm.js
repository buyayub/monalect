import TextInput from '/src/components/TextInput'
import Button from '/src/components/Button'

const AnswerForm = ({ cancel, submitAnswer = null }) => {
	return (
		<form className="mn-c-answer-form">
			<TextInput label="Answer" name="answer" />
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

export default AnswerForm
