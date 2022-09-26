import { FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

import { DELETE_ANSWER } from 'src/shared/queries'
import { useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

const QuestionAnswer = ({
	title = 'Unnamed',
	correct = true,
	className = '',
	handleDelete = null,
	answer = null,
}) => {
	let correctDisplay = correct ? 'mn-is-correct' : 'mn-is-incorrect'

	const [deleteAnswer] = useMutation(DELETE_ANSWER)
	const { currentUser } = useAuth()

	const submitDelete = () => {
		deleteAnswer({
			variables: {
				userId: currentUser.id,
				id: answer.id,
			},
		})

		if (handleDelete) {
			handleDelete(answer)
		}
	}

	return (
		<div
			className={`mn-flex-row mn-gap-small mn-hover-collapse mn-clickable ${className} ${correctDisplay}`}
		>
			<div className="main">
				<p>{title}</p>
			</div>
			<IconButton
				onClick={submitDelete}
				className="mn-on-hover-collapse mn-is-danger mn-is-small"
			>
				<FiX />
			</IconButton>
		</div>
	)
}

export default QuestionAnswer
