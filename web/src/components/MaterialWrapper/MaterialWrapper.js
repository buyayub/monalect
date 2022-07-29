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
	setRoot,
	showSection,
}) => {
	return (
		<div className="mn-c-learning-material-section">
			<LearningMaterial
				type={type}
				title={title}
				pages={pages}
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
									handleDelete={() => sectionDelete(index, i)}
								/>
							)
						})}
				</div>
			)}
			{type == 'textbook' && (
				<MaterialSectionAdd
					onClick={() => {
						setRoot(index)
						showSection(true)
					}}
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
	setRoot,
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
							setRoot={setRoot}
							showSection={showSection}
						/>
					)
				})}
				<div className="mn-c-learning-material-section">
					<LearningMaterialAdd onClick={showForm} />
				</div>
			</div>
		</div>
	)
}

export default MaterialWrapper
