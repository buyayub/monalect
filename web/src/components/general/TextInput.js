const TextInput = ({
	name,
	label = null,
	description = null,
	inputmode,
	placeholder,
	className = '',
	required = false,
	minlength,
	maxlength,
	pattern,
	type = 'text',
	onChange,
}) => {
	return (
		<div className={'mn-c-text-input ' + className}>
			{label != null && <label htmlFor={name}> {label} </label>}
			<div>
				<input
					type={type}
					name={name}
					placeholder={placeholder}
					minLength={minlength}
					maxLength={maxlength}
					pattern={pattern}
					required={required}
					inputMode={inputmode}
					onChange={onChange}
				></input>
				{description != null && <p> {description} </p>}
			</div>
		</div>
	)
}

export default TextInput
