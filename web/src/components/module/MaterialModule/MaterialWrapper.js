import { LearningMaterial, LearningMaterialAdd, MaterialSection, MaterialSectionAdd } from 'src/components'
import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'

const LearningMaterialSection = ({
	material,
	sections,
	uploaded,
	tools,
	setSectionRoot,
	showSection,
	linkMode,
	lessonRoot,
	linkSection,
}) => {
	return (
		<div className={`mn-flex-column mn-gap-medium`}>
			<LearningMaterial
				className={linkMode && material.type === 'textbook' ? 'mn-is-inactive' : ''}
				material={material}
				onClick={() => {
					// add link to lesson
					if (linkMode && material.type == 'article') {
						tools.add('link', {
							type: 'article',
							title: material.title,
							materialId: material.localId,
							lessonId: lessonRoot,
						})
					}
					return null
				}}
				handleDelete={() => {
					tools.delete('material', material.localId)
				}}
			/>
			<div className="mn-flex-column mn-gap-small mn-indent">
				{sections
					.map((section, i) => {
						return (
							<MaterialSection
								key={i}
								section={section}
								onClick={() => {
									// add link to lesson
									if (linkMode) {
										tools.add('link', {
											type: 'section',
											title: section.title,
											materialId: section.localId,
											lessonId: lessonRoot,
										})
									}
									return null
								}}
								handleDelete={() => tools.delete('section', section.localId)}
							/>
						)
					})}
				{material.type == 'textbook' ? (
					<MaterialSectionAdd
						className={linkMode ? 'mn-inactive-text' : ''}
						onClick={
							!linkMode
								? () => {
										setSectionRoot(material.localId)
										showSection(true)
								  }
								: null
						}
					>
						<FiPlus />
					</MaterialSectionAdd>
				) : (
					''
				)}
			</div>
		</div>
	)
}

const MaterialWrapper = ({
	className,
	course,
	tools,
	showForm,
	showSection,
	setSectionRoot,
	linkMode,
	lessonRoot,
}) => {
	return (
		<div className={`mn-flex-column mn-gap-medium ${className}`}>
			<h2 className="mn-text-blue"> Learning Material </h2>
			<div className="mn-flex-column mn-gap-large mn-c-card">
				{course.material.map((material, i) => {
					return (
						<LearningMaterialSection
							key={i}
							material={material}
							sections={course.section.filter(
								(section) => section.textbookId == material.localId
							)}
							setSectionRoot={setSectionRoot}
							showSection={showSection}
							linkMode={linkMode}
							lessonRoot={lessonRoot}
							tools={tools}
						/>
					)
				})}
				<LearningMaterialAdd
					className={linkMode ? 'mn-is-inactive' : ''}
					onClick={!linkMode ? showForm : null}
				/>
			</div>
		</div>
	)
}

export default MaterialWrapper
