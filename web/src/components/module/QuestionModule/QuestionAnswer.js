import { FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'
import { useAuth } from '@redwoodjs/auth'
import { deleteAnswer } from 'src/controller/answer/'
import { useParams } from '@redwoodjs/router'
import { useApolloClient } from '@apollo/client'

const QuestionAnswer = ({
	title = 'Unnamed',
	correct = true,
	className = '',
	handleDelete = null,
	answer = null,
}) => {
	let correctDisplay = correct ? 'mn-is-correct' : 'mn-is-incorrect'
	const { currentUser } = useAuth()
	const { courseId } = useParams()
	const client = useApolloClient()

	const submitDelete = () => {
		deleteAnswer(client, currentUser.id, courseId, answer.id)

		if (handleDelete) {
			handleDelete(answer)
		}
	}

	return (
		<div
			className={`mn-flex-row mn-gap-small mn-clickable ${className} ${correctDisplay}`}
		>
			<div>
				<p>{title}</p>
			</div>
			<IconButton
				onClick={submitDelete}
				className="mn-is-danger mn-is-small mn-is-soft"
			>
				<FiX />
			</IconButton>
		</div>
	)
}

export default QuestionAnswer
