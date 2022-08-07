import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

const LessonDisplay = ({
	index,
	title,
	notebookWords,
	questionCount,
	mark=0,
	onClick
}) => {
	return (
		<div onClick={onClick} className="mn-c-lesson-display">
			<div className="index">{index}</div>
			<div className="main">
				<p> {title} </p>
				<div className="lesson-stats">
					<span>
						<FiHelpCircle />
						<p>{notebookWords == null ? 0 : notebookWords}</p>
					</span>
					<span>
						<RiBook2Line />
						<p>{questionCount}</p>
					</span>
				</div>
			</div>
			<div className="mark">
				{mark}%
			</div>
		</div>
	)
}

export default LessonDisplay
