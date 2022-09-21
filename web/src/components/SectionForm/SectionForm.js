import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'

const SectionForm = ({
	cancel,
	addSection,
	sectionRoot,
	identifier,
	setIdentifier,
}) => {
	const onSubmit = (e) => {
		e.preventDefault()
		const section = {
			title: e.target[0].value,
			start: parseInt(e.target[1].value),
			end: parseInt(e.target[2].value),
			localId: identifier,
		}

		addSection(section, sectionRoot)
		setIdentifier(identifier + 1)
		e.target.reset()
		cancel()
	}
	return (
		<form className="mn-flex-column mn-gap-medium" onSubmit={onSubmit}>
			<TextInput label="Title" />
			<div className="mn-flex-row mn-justify-space-between">
			<p> Page Range </p>
			<div className="mn-flex-row mn-gap-medium mn-align-center">
				<TextInput className="mn-is-numeric" type="numeric" />
				<p className="range"> to </p>
				<TextInput className="mn-is-numeric" type="numeric" />
			</div>
			</div>
			<div className="mn-flex-row mn-gap-medium mn-align-self-center">
				<Button
					className="mn-is-secondary"
					type="reset"
					onClick={cancel}
				>
					Cancel
				</Button>
				<Button className="" type="submit">
					Add
				</Button>
			</div>
		</form>
	)
}

export default SectionForm
