import {FiXCircle, FiCheckCircle, FiMinusSquare} from 'react-icons/fi'

const QuestionAnswer = ({
	title="Enter Answer",
	correct=true,
	className="",
	handleDelete
}) => {
	let correctDisplay = (correct ? "mn-is-correct" : "")

	return (
		<div className={`mn-c-answer ${className} ${correctDisplay}`}>
			<div className="main">
				<p>{title}</p>
			</div>
			<div onClick={handleDelete} className="buttons">
				<FiMinusSquare className="delete" />
			</div>
		</div>
	)
}

export default QuestionAnswer
