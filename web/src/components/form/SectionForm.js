import { Button, TextInput }from 'src/components'

const SectionForm = ({
	cancel,
	tools,
	sectionRoot,
}) => {
	const onSubmit = (e) => {
		e.preventDefault()
		const section = {
			textbookId: sectionRoot,
			title: e.target[0].value,
			start: parseInt(e.target[1].value) ? parseInt(e.target[1].value) : null,
			end: parseInt(e.target[2].value) ? parseInt(e.target[2].value) : null,
		}
		tools.add('section', section)
		e.target.reset()
		cancel()
	}
	return (
		<form
			className="mn-flex-column mn-gap-large mn-form-width-medium"
			onSubmit={onSubmit}
		>
			<div className="mn-flex-column mn-gap-small">
			<TextInput label="Title" />
			<div className="mn-flex-row mn-justify-space-between">
				<p> Page Range </p>
				<div className="mn-flex-row mn-gap-medium mn-align-center">
					<TextInput className="mn-is-numeric" type="numeric" />
					<p className="range"> to </p>
					<TextInput className="mn-is-numeric" type="numeric" />
				</div>
			</div>
			</div>
			<div className="mn-flex-row mn-gap-medium mn-align-self-center">
				<Button className="mn-is-secondary" type="reset" onClick={cancel}>
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
