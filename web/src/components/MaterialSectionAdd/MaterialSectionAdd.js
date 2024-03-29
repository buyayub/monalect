import IconButton from 'src/components/IconButton'

const LearningMaterialAdd = ({
	onClick,
	label = 'Add Section',
	className = '',
	children
}) => {
	return (
		<div
			className={
				'mn-text-blue mn-flex-row mn-gap-small mn-clickable mn-align-center ' + className
			}
			onClick={onClick}
		>
			<IconButton className="mn-is-small mn-is-secondary">
				{children}
			</IconButton>
			<p>{label}</p>
		</div>
	)
}

export default LearningMaterialAdd
