import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'

const SectionForm = ({cancel, addSection, sectionRoot}) => {
	const onSubmit = (e) => {
		e.preventDefault()
		const section = {
			title: e.target[0].value,
			start: e.target[1].value,
			end: e.target[2].value
		}

		addSection(section, sectionRoot);
		e.target.reset();
		cancel();

	};
  return (
	  <form className="mn-c-section-form" onSubmit={onSubmit}>
		  <TextInput label="Title" />
		  <div className="pages">
			  <TextInput className="mn-is-numeric" type="numeric" />
			  <p className="range"> to </p>
			  <TextInput className="mn-is-numeric" type="numeric" />
		  </div>
		  <div className="buttons">
			<Button className="mn-is-secondary mn-is-small" type="reset" onClick={cancel}>Cancel</Button>
			<Button className="mn-is-small" type="submit">Add</Button>
		  </div>
	  </form>
  )
}

export default SectionForm
