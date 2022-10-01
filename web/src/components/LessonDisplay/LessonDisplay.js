import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

const LessonDisplay = ({
	index,
	title,
	notebookWords,
	questionCount,
	mark = 0,
	onClick,
	active = false,
}) => {
	return (
		<div onClick={onClick} className="mn-hover mn-flex-row mn-gap-medium mn-clickable">
			<div className="index">{index}</div>
			<div
				className={`mn-flex-row mn-gap-large mn-grow mn-justify-space-between mn-text-padding ${
					active ? 'mn-border-left mn-border-bottom' : 'mn-border-left'
				}`}
			>
				<p> {title} </p>
				<div className="mn-flex-row mn-gap-x-large">
					<div className="mn-flex-row mn-on-hover-active mn-is-inactive mn-gap-small">
						<span className="mn-flex-row mn-gap-x-small">
							<RiBook2Line />
							<p>{notebookWords == null ? 0 : notebookWords}</p>
						</span>
						<span className="mn-flex-row mn-gap-x-small">
							<FiHelpCircle />
							<p>{questionCount}</p>
						</span>
					</div>
					<div className="mn-width-large mn-text-align-end">{mark ? mark : 0}%</div>
				</div>
			</div>
		</div>
	)
}

export default LessonDisplay
