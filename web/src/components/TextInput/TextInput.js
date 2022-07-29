const TextInput = ({
	name, 
	label=null, 
	description=null, 
	inputmode,
	placeholder, 
	className="", 
	required=false,
	minlength,
	maxlength,
	pattern,
	type="text"
}) => {
return (
        
        <div className={"mn-c-textinput " + className}>
		{label != null && <label htmlFor={name}> {label} </label>}
      	  <input 
      	  	type={type}
      	  	name={name} 
      	  	placeholder={placeholder}
      		minLength={minlength}
		maxLength={maxlength}
		pattern={pattern}
		required={required}
		inputMode={inputmode}
	  ></input>
		{description != null && <p> {description} </p>}
      </div>
)
}

export default TextInput
