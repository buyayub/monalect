import TextInput from 'src/components/TextInput'
import FileUpload from 'src/components/FileUpload'
import Dropdown from 'src/components/Dropdown'
import Button from 'src/components/Button'

const LearningMaterialForm = ({
	cancel,
	addMaterial,
	identifier,
	setIdentifier,
	addUploaded,
}) => {
	const onSubmit = (e) => {
		e.preventDefault()
		const materialType = e.target[0].value
		const title = e.target[1].value
		const author = e.target[2].value
		const standardId = e.target[3].value
		const file = e.target[4].files[0]
		const uploaded = file != undefined ? true : false
		const pages = parseInt(e.target[5].value)
		const offset = parseInt(e.target[6].value)

		const textbook = {
			type: materialType,
			title: title,
			author: author,
			identifier: standardId,
			pages: parseInt(pages),
			offset: offset,
			uploaded: uploaded,
			sections: [],
			localId: identifier,
		}
		addMaterial(textbook)
		addUploaded(file, identifier)

		setIdentifier(identifier + 1)
		e.target.reset()
		cancel()
	}

	return (
		<form
			className="mn-c-material-form mn-flex-column mn-gap-large mn-form-width-medium"
			onSubmit={onSubmit}
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
