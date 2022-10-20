import { FiBook, FiFileText } from 'react-icons/fi'

const LessonMaterialDisplay = ({ type, section }) => {
	return (
		<div className="mn-flex-row mn-justify-space-between">
			<div className="mn-flex-row mn-gap-small">
				{type == 'section' ? <FiBook /> : <FiFileText />}
				<p>{section.title}</p>
			</div>
			<div className="mn-flex-row">
				{type == 'section' ? <p>
					{section.start} - {section.end}
				</p>
				:
						""
				}
			</div>
		</div>
	)
}

export default LessonMaterialDisplay
