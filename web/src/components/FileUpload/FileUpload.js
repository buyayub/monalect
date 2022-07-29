import {FiUpload} from 'react-icons/fi';

const FileUpload = ({
	name, 
	label, 
	title,
	description, 
	accept="",
	className="", 
	required=false,
	onChange
}) => {
return (
        
        <div className={"mn-c-file-upload " + className}>
      	  <label htmlFor={name} className="label"> {label} </label>
	<label className="input" title={title}>
		  <input 
			type="file"
			name={name} 
			required={required}
			  accept={accept}
			  onChange={onChange}
		  />
		<div className="title">
			<p>{title}</p>
		</div>
		<div className="icon">
			<FiUpload />
		</div>
	</label>
      	<p> {description}</p>
      </div>
)
}

export default FileUpload
