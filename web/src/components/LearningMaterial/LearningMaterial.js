import { FiBook, FiFileText, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

const LearningMaterial = ({
	className = '',
	title = 'Untitled',
	pages = 0,
	type = 'textbook',
	handleDelete,
	onClick,
	fileAdded=false,
}) => {
	return (
		<div className={'mn-flex-row mn-justify-space-between mn-clickable mn-hover ' + className}>
			<div className="mn-flex-row mn-align-center mn-gap-small" onClick={onClick}>
				<div>
					{type == 'article' ? <FiFileText className="mn-icon-medium" /> : ''}
					{type == 'textbook' ? <FiBook className="mn-icon-medium" /> : ''}
				</div>
				<div>
					<h3> {title} </h3>
					<div className="mn-flex-row mn-gap-small mn-align-center">
						<legend> {pages} pages </legend>
						{fileAdded ? <legend className="mn-text-blue">FILE ADDED</legend> : ""}
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
