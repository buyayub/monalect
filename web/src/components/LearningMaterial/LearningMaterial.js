import { FiBook, FiFileText, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

const LearningMaterial = ({
	className = '',
	title = 'Untitled',
	pages = 0,
	type = 'textbook',
	handleDelete,
	onClick,
}) => {
	return (
		<div className={'mn-c-learning-material ' + className}>
			<div className="main handle" onClick={onClick}>
				<div className="icon">
					{type == 'article' ? <FiFileText /> : ''}
					{type == 'textbook' ? <FiBook /> : ''}
				</div>
				<div className="title">
					<p> {title} </p>
					<p className="mn-is-small mn-is-secondary"> {pages} pages </p>
				</div>
			</div>
			<IconButton className="mn-is-danger mn-is-small" onClick={handleDelete}>
				{' '}
				<FiX />{' '}
			</IconButton>
		</div>
	)
}

export default LearningMaterial
