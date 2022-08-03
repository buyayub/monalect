import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'

const LessonForm = ({cancel, addLesson, identifier, setIdentifier}) => {
	const onSubmit = (e) => {
		e.preventDefault()
		const lesson = {
			title: e.target[0].value,
			material: [],
			localId: identifier
		}
		addLesson(lesson);
		setIdentifier(identifier + 1);
		e.target.reset();
		cancel();
	};
  return (
	  <form className="mn-c-section-form" onSubmit={onSubmit}>
		  <TextInput label="Title" />
		  <div className="buttons">
			<Button className="mn-is-secondary mn-is-small" type="reset" onClick={cancel}>Cancel</Button>
			<Button className="mn-is-small" type="submit">Add</Button>
		  </div>
	  </form>
  )
}

export default LessonForm

