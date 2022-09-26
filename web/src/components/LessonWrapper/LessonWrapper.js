import MaterialSection from 'src/components/MaterialSection'
import Button from 'src/components/Button'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'
import { FiPlus, FiLink } from 'react-icons/fi'

const LessonNode = ({
	index,
	title,
	handleDelete,
	lessonMaterial = null,
	materials = null,
	setLessonRoot,
	lessonRoot,
	linkMode,
	setLinkMode,
	unlinkSection,
}) => {
	return (
		<div className="mn-flex-column mn-gap-small">
			<MaterialSection
				className={
					`mn-is-large ` +
					(linkMode && lessonRoot == index ? `mn-is-active` : ``)
				}
				key={index}
				icon={`${index + 1}`}
				title={title}
				handleDelete={handleDelete}
				sections={lessonMaterial}
			/>
			<div className="mn-indent mn-flex-column mn-gap-small">
				{lessonMaterial.map((material, i) => {
					if (material.type == 'article') {
						let materialDisplay = materials[material.materialId]
						return (
							<MaterialSection
								key={i}
								title={materialDisplay.title}
								handleDelete={() => unlinkSection(index, i)}
							/>
						)
					}
					let sectionTitle = ''
					let startPage = 0
					let endPage = 0

					// Check if the section exists, and isn't an article. If it goes through, then assign values to variables.
					if (materials != null) {
						if (materials[material.materialId].sections.length > 0) {
							let display =
								materials[material.materialId].sections[material.sectionId]
							sectionTitle = display.title
							startPage = display.start
							endPage = display.end
						}
					}
					return (
						<MaterialSection
							key={i}
							title={sectionTitle}
							start={startPage}
							end={endPage}
							handleDelete={() => unlinkSection(index, i)}
						/>
					)
				})}
				<MaterialSectionAdd
					onClick={() => {
						setLinkMode(true)
						setLessonRoot(index)
					}}
					label="Link Material"
				>
					<FiLink />
				</MaterialSectionAdd>
			</div>
		</div>
	)
}
const LessonWrapper = ({
	className,
	lessons = [],
	materials,
	setLessonForm,
	deleteLesson,
	setLinkMode,
	setLessonRoot,
	linkMode,
	lessonRoot,
	unlinkSection = null,
}) => {
	return (
		<div className={`mn-flex-column mn-gap-medium ${className}`}>
			<div className="mn-flex-row mn-justify-space-between">
				<h2 className="mn-text-blue"> Lessons </h2>
				<Button
					className={!linkMode ? 'mn-is-hidden' : ''}
					onClick={() => setLinkMode(false)}
				>
					{' '}
					Exit{' '}
				</Button>
			</div>
			<div className="mn-c-card mn-flex-column mn-gap-medium">
				{lessons.map((lesson, i) => {
					return (
						<LessonNode
							key={i}
							index={i}
							title={lesson.title}
							lessonMaterial={lesson.material}
							handleDelete={() => deleteLesson(i)}
							materials={materials}
							unlinkSection={unlinkSection}
							setLinkMode={setLinkMode}
							setLessonRoot={setLessonRoot}
							linkMode={linkMode}
							lessonRoot={lessonRoot}
						/>
					)
				})}
				<MaterialSectionAdd
					onClick={() => {
						setLinkMode(false)
						setLessonForm(true)
					}}
					label="Add Lesson"
					className="mn-is-large"
				>
					<FiPlus />
				</MaterialSectionAdd> 
			</div>
		</div>
	)
}

export default LessonWrapper
