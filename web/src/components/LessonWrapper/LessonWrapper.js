import MaterialSection from 'src/components/MaterialSection'
import Button from 'src/components/Button'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'

const LessonNode = ({
	index,
	title,
	handleDelete,
	sections = null,
	materials = null,
	setLessonRoot,
	lessonRoot,
	linkMode,
	setLinkMode,
	unlinkSection
}) => {
	return (
		<div className="mn-c-lesson-node">
			<MaterialSection
				className={`mn-is-large ` + (linkMode && (lessonRoot == index) ? `mn-is-active` : ``)}
				key={index}
				icon={`${index + 1}`}
				title={title}
				handleDelete={handleDelete}
				sections={sections}
			/>
			<div className="lesson-list">
				{sections.map((section, i) => {
					if (section.type == "article") {
							let material = materials[section.materialId];
							return <MaterialSection 
									key={i}
									title={material.title}
									handleDelete={()=>unlinkSection(index, i)}
							/>
					}
					let sectionTitle = ''
					let startPage = 0
					let endPage = 0

					// Check if the section exists, and isn't an article. If it goes through, then assign values to variables.
					if (materials != null) {
						if (materials[section.materialId].type != 'article') {
							if (materials[section.materialId].sections.length > 0) {
								let display = materials[section.materialId].sections[section.sectionId]
								sectionTitle = display.title
								startPage = display.start
								endPage = display.end
							}
						}
					}
					return (
						<MaterialSection
							key={i}
							title={sectionTitle}
							start={startPage}
							end={endPage}
							handleDelete={()=>unlinkSection(index, i)}
						/>
					)
				})}
					<MaterialSectionAdd onClick={() => {setLinkMode(true); setLessonRoot(index)}} label="Link Material" />
			</div>
		</div>
	)
}
const LessonWrapper = ({ lessons = [], materials, setLessonForm, deleteLesson, setLinkMode, setLessonRoot, linkMode, lessonRoot, unlinkSection=null}) => {
	return (
		<div className="mn-c-lesson-main">
			<div className="title">
					<h2> Lessons </h2>
					<Button className={!linkMode ? "mn-is-hidden" : ""} onClick={() => setLinkMode(false)}> Exit </Button>
			</div>
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
							unlinkSection={unlinkSection}
							setLinkMode={setLinkMode}
							setLessonRoot={setLessonRoot}
							linkMode={linkMode}
							lessonRoot={lessonRoot}
						/>
					)
				})}
				<MaterialSectionAdd onClick={() => {setLinkMode(false); setLessonForm(true)}} label="Add Lesson" className="mn-is-large" />
			</div>
		</div>
	)
}

export default LessonWrapper
