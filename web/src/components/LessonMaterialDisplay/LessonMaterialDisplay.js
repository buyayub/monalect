import { FiBook, FiFileText } from 'react-icons/fi'

const LessonMaterialDisplay = ({ type, title, start, end }) => {
	return (
		<div className="mn-c-lesson-material-display">
			<div className="type">
				{type == 'section' ? <FiBook /> : <FiFileText />}
			</div>
			<div className="main">
				<p>{title}</p>
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
