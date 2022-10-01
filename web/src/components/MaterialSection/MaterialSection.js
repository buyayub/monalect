import { FiFileText, FiX } from 'react-icons/fi'
import IconButton from 'src/components/IconButton'

const MaterialSection = ({
	start = undefined,
	end = undefined,
	title = 'Untitled',
	className = '',
	handleDelete,
	onClick = null,
	icon = null,
}) => {
	return (
		<div
			className={
				'mn-flex-row mn-align-center mn-justify-space-between mn-hover mn-clickable ' +
				className
			}
		>
			<div className="mn-flex-row mn-gap-small mn-align-center" onClick={onClick}>
				<div>{icon == null ? <FiFileText /> : icon}</div>
				<p> {title} </p>
			</div>
			<div className="mn-flex-row mn-gap-large mn-align-center">
				{start && end && (
					<p className="mn-is-secondary">
						{start} - {end}
					</p>
				)}
				<IconButton
					className="mn-is-danger mn-is-small mn-on-hover "
					onClick={handleDelete}
				>
					{' '}
					<FiX />{' '}
				</IconButton>
			</div>
		</div>
	)
}

export default MaterialSection
