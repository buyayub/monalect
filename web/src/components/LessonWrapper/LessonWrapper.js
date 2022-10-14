import MaterialSection from 'src/components/MaterialSection'
import Button from 'src/components/Button'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'
import { FiPlus, FiLink } from 'react-icons/fi'

const LessonNode = ({
	index,
	tools,
	lesson,
	course,
	handleDelete,
	setLessonRoot,
	lessonRoot,
	linkMode,
	setLinkMode,
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
				handleDelete={handleDelete}
				section={{title: lesson.title}}
			/>
			<div className="mn-indent mn-flex-column mn-gap-small">
				{course.link.filter(link =>  link.lessonId == lesson.localId).map((link, i) => {
					if (link.type == 'article') {
						return (
							<MaterialSection
								key={i}
								handleDelete={() => tools.delete('link', link.localId)}
								section={course.material.find((material) => (material.localId == link.materialId) && (material.type == 'article'))}
							/>
						)
					}
					return (
						<MaterialSection
							key={i}
							handleDelete={() => tools.delete('link', link.localId)}
							section={course.section.find((section) => section.localId == link.materialId)}
						/>
					)
				})}
				<MaterialSectionAdd
					onClick={() => {
						setLinkMode(true)
						setLessonRoot(lesson.localId)
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
	course,
	tools,
	className,
	setLessonForm,
	setLinkMode,
	setLessonRoot,
	linkMode,
	lessonRoot,
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
				{course.lesson.map((lesson, i) => {
					return (
						<LessonNode
							key={i}
							index={i}
							lesson={lesson}
							handleDelete={() => tools.delete('lesson', lesson.localId)}
							course={course}
							tools={tools}
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
