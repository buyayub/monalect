import LessonMaterialDisplay from 'src/components/LessonMaterialDisplay'
import { useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

const LessonBlock = ({ lesson }) => {
	const [expand, setExpand] = useState(false)

	return (
		<div className="mn-flex-column">
			<div
				onClick={() => setExpand(!expand)}
				className="mn-hover mn-flex-row mn-gap-medium mn-clickable"
			>
				<div className="index">{lesson.index}</div>
				<div
					className={`mn-flex-row mn-gap-large mn-grow mn-justify-space-between mn-text-padding ${
						expand ? 'mn-border-left mn-border-bottom' : 'mn-border-left'
					}`}
				>
					<p> {lesson.title} </p>
					<div className="mn-flex-row mn-gap-x-large">
						<div className="mn-flex-row mn-on-hover-active mn-is-inactive mn-gap-small">
							<span className="mn-flex-row mn-gap-x-small">
								<RiBook2Line />
								<p>{lesson.notebookWords == null ? 0 : lesson.notebookWords}</p>
							</span>
							<span className="mn-flex-row mn-gap-x-small">
								<FiHelpCircle />
								<p>{lesson.questionCount}</p>
							</span>
						</div>
						<div className="mn-width-large mn-text-align-end">
							{lesson.mark ? lesson.mark : 0}%
						</div>
					</div>
				</div>
			</div>
			<div
				className={`mn-indent mn-padding-bottom-medium mn-flex-column mn-indent-top-small mn-gap-x-small ${
					!expand ? 'mn-is-hidden' : ''
				}`}
			>
				{lesson.articles.map((article, i) => (
					<LessonMaterialDisplay type="article" section={section} key={i} />
				))}
				{lesson.sections.map((section, i) => (
					<LessonMaterialDisplay
						type="section"
						section={section}
						key = {i}
					/>
				))}
			</div>
		</div>
	)
}

export default LessonBlock
