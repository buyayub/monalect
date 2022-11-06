import { TextInput, FileUpload, Dropdown, Button }from 'src/components'

const LearningMaterialForm = ({
	cancel,
	tools
}) => {
	const onSubmit = (e) => {
		e.preventDefault()

		const material = {
			type: e.target[0].value,
			title: e.target[1].value,
			author: e.target[2].value,
			identifier: e.target[3].value,
			file: e.target[4].files[0],
			pages: parseInt(e.target[5].value),
			offset: parseInt(e.target[6].value),
			uploaded: e.target[4].files[0] ? true : false,
		}

		console.debug({material})
		console.debug({e})
		tools.add('material', material)
		e.target.reset()
		cancel()
	}

	return (
		<form
			className="mn-c-material-form mn-flex-column mn-gap-large mn-form-width-medium"
			onSubmit={onSubmit}
			autoComplete="off"
		>
			<Dropdown
				items={[
					{ title: 'Textbook', value: 'textbook' },
					{ title: 'Article', value: 'article' },
				]}
				className="mn-align-self-center"
			/>
			<div className="mn-flex-column mn-gap-small">
				<TextInput required label="Title" name="title" />
				<TextInput label="Author*" name="author" />
				<TextInput label="ISBN/doi*" name="isbn" />
				<FileUpload
					label="File*"
					name="file"
					className="mn-is-small"
					accept=".pdf"
				/>
				<TextInput
					label="Pages*"
					name="pages"
					className="mn-is-numeric"
					inputmode="numeric"
				/>
				<TextInput
					label="Offset*"
					name="offset"
					className="mn-is-numeric"
					inputmode="numeric"
				/>
			</div>
			<div className="mn-flex-row mn-gap-medium mn-align-self-center">
				<Button className="mn-is-secondary" type="reset" onClick={cancel}>
					Cancel
				</Button>
				<Button type="submit">Add</Button>
			</div>
		</form>
	)
}

export default LearningMaterialForm
