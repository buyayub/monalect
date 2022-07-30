import LearningMaterial from 'src/components/LearningMaterial'
import LearningMaterialAdd from 'src/components/LearningMaterialAdd'
import MaterialSection from 'src/components/MaterialSection'
import MaterialSectionAdd from 'src/components/MaterialSectionAdd'

const LearningMaterialSection = ({
	type,
	title,
	pages,
	sections,
	sectionDelete,
	materialDelete,
	index,
	setSectionRoot,
	showSection,
	linkMode,
	lessonRoot,
	linkSection
}) => {
	return (
		<div className="mn-c-learning-material-section">
			<LearningMaterial
				type={type}
					className={linkMode && type=="textbook" ? "mn-is-inactive" : ""}
				title={title}
				pages={pages}
				onClick={(e) => { 
						if (linkMode && type=="article") { linkSection(lessonRoot, "article", index); }
						return null
				}}
				handleDelete={() => {
					materialDelete(index)
				}}
			/>
			{sections != null && sections.length != 0 && (
				<div className="section-list">
					{sections != null &&
						sections.map((section, i) => {
							return (
								<MaterialSection
									key={i}
									start={section.start}
									end={section.end}
									title={section.title}
									onClick={(e) => { 
												if (linkMode) { linkSection(lessonRoot, "section", index, i); }
												return null
										}}
									handleDelete={() => sectionDelete(index, i)}
								/>
							)
						})}
				</div>
			)}
			{type == 'textbook' && (
				<MaterialSectionAdd
					className={linkMode ? "mn-is-inactive" : ""}
						onClick={!linkMode ? () => { 
								setSectionRoot(index)
								showSection(true)
						} : null
					}
				/>
			)}
		</div>
	)
}

const MaterialWrapper = ({
	materials = [],
	showForm,
	showSection,
	sectionDelete,
	materialDelete,
	setSectionRoot,
	linkMode,
	lessonRoot,
	linkSection
}) => {
	return (
		<div className="mn-c-material-whole">
			<h2 className="mn-is-secondary"> Learning Material </h2>
			<div className="mn-c-material-wrapper">
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
				<div className="mn-c-learning-material-section">
				<LearningMaterialAdd 
						className={linkMode ? "mn-is-inactive" : ""} 
						onClick={!linkMode ? showForm : null} 
						/>
				</div>
			</div>
		</div>
	)
}

export default MaterialWrapper
