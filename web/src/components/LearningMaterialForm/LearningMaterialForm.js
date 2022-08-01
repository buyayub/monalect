import TextInput from 'src/components/TextInput';
import FileUpload from 'src/components/FileUpload';
import Dropdown from 'src/components/Dropdown';
import Button from 'src/components/Button';
import {useState} from 'react';

const LearningMaterialForm = ({cancel, addMaterial}) => {
	const [fileName, fileNameSet] = useState("Browse...");
	const fileChange = (e) => {
		const arr = e.target.value.split('\\');
		fileNameSet(arr[arr.length - 1]);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		
		const type = e.target[0].value;
		const title = e.target[1].value;
		const author = e.target[2].value;
		const identifier = e.target[3].value;
		const pages = e.target[5].value;
		const offset = e.target[6].value;

		if (type == "textbook") {
			const textbook = {
				type: "textbook",
				title: title,
				author: author,
				isbn: identifier,
				pages: pages,
				offset: offset,
				sections: [],
				id: null
			}
			addMaterial(textbook);
		}
		else if (type == "article") {
			const article = {
				type: "article",
				title: title,
				doi: identifier,
				author: author,
				pages: pages,
				offset: offset,
				id: null
			}
			addMaterial(article);
		}

		e.target.reset();
		cancel();
	}

  return (
    <form className="mn-c-material-form" onSubmit={onSubmit}>
	<Dropdown items={[{title: "Textbook", value: "textbook"}, {title:"Article", value: "article"}]} />
     	<TextInput required label="Title" name="title"/> 
     	<TextInput label="Author*" name="author"/> 
     	<TextInput label="ISBN/doi*" name="isbn"/> 
    <div className="pdf-upload"> 
	    <FileUpload label="File*"  name="file" className="mn-is-small" title={fileName} onChange={fileChange} accept=".pdf" />
	    <TextInput required label="Pages" name="pages" className="mn-is-numeric" inputmode="numeric" />
	    <TextInput label="Offset*" name="offset" className="mn-is-numeric" inputmode="numeric" />
    </div>
	<div className="button">
		<Button className="mn-is-secondary mn-is-small" type="reset" onClick={cancel}>Cancel</Button>
		<Button className="mn-is-small" type="submit">Add</Button>
	</div>
    </form>
  )
}

export default LearningMaterialForm
