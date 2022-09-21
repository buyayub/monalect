import { FiPlus } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

const LearningMaterialAdd = ({
	onClick,
	label = 'Add Section',
	className = '',
}) => {
	return (
		<div
			className={
				'mn-text-blue mn-flex-row mn-gap-small mn-clickable mn-align-center ' + className
			}
			onClick={onClick}
		>
			<IconButton className="mn-is-small mn-is-secondary">
				<FiPlus />
			</IconButton>
			<p>{label}</p>
		</div>
	)
}

export default LearningMaterialAdd
