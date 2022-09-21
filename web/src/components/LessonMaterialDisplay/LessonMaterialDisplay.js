import { FiBook, FiFileText } from 'react-icons/fi'

const LessonMaterialDisplay = ({ type, title, start, end }) => {
	return (
		<div className="mn-flex-row mn-justify-space-between">
			<div className="mn-flex-row mn-gap-small">
				{type == 'section' ? <FiBook /> : <FiFileText />}
				<p>{title}</p>
			</div>
			<div className="mn-flex-row">
				{type == 'section' ? <p>
					{start} - {end}
				</p>
				:
						""
				}
			</div>
		</div>
	)
}

export default LessonMaterialDisplay
