import MaterialSection from 'src/components/MaterialSection'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'

const LessonNode = ({
	index,
	title,
	handleDelete,
	sections = null,
	materials = null,
}) => {
	return (
		<div className="mn-c-lesson-node">
			<MaterialSection
				className="mn-is-large"
				key={index}
				icon={`${index + 1}`}
				title={title}
				handleDelete={handleDelete}
				sections={sections}
			/>
			<div className="lesson-list">
				{sections.map((section, i) => {
					let sectionTitle = ''
					let startPage = 0
					let endPage = 0
					let display = null
					if (materials != null) {
						if (materials[section.materialId].type != 'article') {
							if (materials[section.materialId].sections.length > 0) {
								display = materials[section.materialId].sections[section.id]
								sectionTitle = display.title
								startPage = display.start
								endPage = display.end
							}
						}
					}
					return (
						<MaterialSection
							key={index}
							title={sectionTitle}
							start={startPage}
							end={endPage}
						/>
					)
				})}
				<MaterialSectionAdd label="Link Material" />
			</div>
		</div>
	)
}
const LessonWrapper = ({ lessons = [], materials, setLessonForm, deleteLesson}) => {
	return (
		<div className="mn-c-lesson-main">
			<h2> Lessons </h2>
			<div className="mn-c-lesson-wrapper">
				{lessons.map((lesson, i) => {
					return (
						<LessonNode
							key={i}
							index={i}
							title={lesson.title}
							sections={lesson.sections}
							handleDelete={()=>deleteLesson(i)}
							materials={materials}
						/>
					)
				})}
				<MaterialSectionAdd onClick={() => setLessonForm(true)} label="Add Lesson" className="mn-is-large" />
			</div>
		</div>
	)
}

export default LessonWrapper
