import LessonDisplay from 'src/components/LessonDisplay'
import LessonMaterialDisplay from 'src/components/LessonMaterialDisplay'
import { useState } from 'react'

const LessonBlock = ({ lesson }) => {
	const [expand, setExpand] = useState(false)

	return (
		<div className="mn-flex-column mn-medium-width">
			<LessonDisplay
				index={lesson.index + 1}
				title={lesson.title}
				notebookWords={lesson.notebookWords}
				questionCount={lesson.questionCount}
				active={expand}
				onClick={() => {
					setExpand(!expand)
				}}
				mark={lesson.mark}
			/>
			<div className={`mn-indent mn-padding-bottom-medium mn-flex-column mn-indent-top-small mn-gap-x-small ${!expand ? 'mn-is-hidden' : ''}`}>
				{lesson.articles.map((article) => (
					<LessonMaterialDisplay type="article" title={article.title} />
				))}
				{lesson.sections.map((section) => (
					<LessonMaterialDisplay
						type="section"
						title={section.title}
						start={section.start}
						end={section.end}
					/>
				))}
			</div>
		</div>
	)
}

export default LessonBlock
