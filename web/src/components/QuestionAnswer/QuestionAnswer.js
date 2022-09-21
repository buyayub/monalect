import {FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

const QuestionAnswer = ({
	title="Unnamed",
	correct=true,
	className="",
	handleDelete
}) => {
	let correctDisplay = (correct ? "mn-is-correct" : "mn-is-incorrect")

	return (
		<div className={`mn-flex-row mn-gap-small mn-hover-collapse mn-clickable ${className} ${correctDisplay}`}>
			<div className="main">
				<p>{title}</p>
			</div>
			<IconButton onClick={handleDelete} className="mn-on-hover-collapse mn-is-danger mn-is-small">
				<FiX />
			</IconButton>
		</div>
	)
}

export default QuestionAnswer
