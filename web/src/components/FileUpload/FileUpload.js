import { FiUpload } from 'react-icons/fi'
import { useState } from 'react'

const FileUpload = ({
	name,
	label,
	description,
	accept = '',
	className = '',
	required = false,
	onChange,
}) => {
	const [fileName, fileNameSet] = useState('Browse...')
	const fileChange = (e) => {
		const arr = e.target.value.split('\\')
		fileNameSet(arr[arr.length - 1])
	}
	return (
		<div className={'mn-c-file-upload ' + className}>
			<label htmlFor={name} className="label">
				{' '}
				{label}{' '}
			</label>
			<div>
				<label className="input" title={fileName}>
					<input
						type="file"
						name={name}
						required={required}
						accept={accept}
						onChange={fileChange}
					/>
					<p className="title">{fileName}</p>
					<div className="icon">
						<FiUpload />
					</div>
				</label>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default FileUpload
