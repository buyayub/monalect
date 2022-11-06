import { FiBook, FiFileText, FiX } from 'react-icons/fi'
import { IconButton } from 'src/components'

const LearningMaterial = ({
	className = '',
	material,
	handleDelete,
	onClick,
}) => {
	return (
		<div className={'mn-flex-row mn-justify-space-between mn-clickable mn-hover ' + className}>
			<div className="mn-flex-row mn-align-center mn-gap-small" onClick={onClick}>
				<div>
					{material.type == 'article' ? <FiFileText className="mn-icon-medium" /> : ''}
					{material.type == 'textbook' ? <FiBook className="mn-icon-medium" /> : ''}
				</div>
				<div>
					<h3> {material.title} </h3>
					<div className="mn-flex-row mn-gap-small mn-align-center">
						<legend> {material.pages ? material.pages : 0} pages </legend>
						{material.uploaded ? <legend className="mn-text-blue">FILE ADDED</legend> : ""}
					</div>
				</div>
			</div>
			<IconButton className="mn-is-danger mn-is-small mn-on-hover" onClick={handleDelete}>
				{' '}
				<FiX />{' '}
			</IconButton>
		</div>
	)
}

export default LearningMaterial
