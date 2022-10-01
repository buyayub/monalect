import LearningMaterial from 'src/components/LearningMaterial'
import LearningMaterialAdd from 'src/components/LearningMaterialAdd'
import MaterialSection from 'src/components/MaterialSection'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'
import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'

const LearningMaterialSection = ({
	type,
	title,
	pages,
	sections,
	sectionDelete,
	materialDelete,
	index,
	uploaded,
	setSectionRoot,
	showSection,
	linkMode,
	lessonRoot,
	linkSection,
}) => {
	return (
		<div className={`mn-flex-column mn-gap-medium`}>
			<LearningMaterial
				type={type}
				className={linkMode && type == 'textbook' ? 'mn-is-inactive' : ''}
				title={title}
				pages={pages}
				fileAdded={uploaded}
				onClick={(e) => {
					if (linkMode && type == 'article') {
						linkSection(lessonRoot, 'article', index)
					}
					return null
				}}
				handleDelete={() => {
					materialDelete(index)
				}}
			/>
			{sections != null && (
				<div className="mn-flex-column mn-gap-small mn-indent">
					{sections != null &&
						sections.map((section, i) => {
							return (
								<MaterialSection
									key={i}
									start={section.start}
									end={section.end}
									title={section.title}
									onClick={(e) => {
										if (linkMode) {
											linkSection(lessonRoot, 'section', index, i)
										}
										return null
									}}
									handleDelete={() => sectionDelete(index, i)}
								/>
							)
						})}
					{type == 'textbook' ? (
							<MaterialSectionAdd
								className={linkMode ? 'mn-inactive-text' : ''}
								onClick={
									!linkMode
										? () => {
												setSectionRoot(index)
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
			)}
		</div>
	)
}

const MaterialWrapper = ({
	className,
	materials = [],
	showForm,
	showSection,
	sectionDelete,
	materialDelete,
	setSectionRoot,
	linkMode,
	lessonRoot,
	linkSection,
}) => {
	return (
		<div className={`mn-flex-column mn-gap-medium ${className}`}>
			<h2 className="mn-text-blue"> Learning Material </h2>
			<div className="mn-flex-column mn-gap-large mn-c-card">
				{materials.map((material, i) => {
					const sections =
						material.type == 'textbook' ? material.sections : null
					return (
						<LearningMaterialSection
							key={i}
							index={i}
							type={material.type}
							title={material.title}
							pages={material.pages}
							uploaded={material.uploaded}
							sections={sections}
							sectionDelete={sectionDelete}
							materialDelete={materialDelete}
							setSectionRoot={setSectionRoot}
							showSection={showSection}
							linkMode={linkMode}
							lessonRoot={lessonRoot}
							linkSection={linkSection}
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
