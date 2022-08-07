import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const NotebookPage = ({ title, content }) => {
	const { quill, quillRef } = useQuill({
		modules: {
			toolbar: [
				[
					'bold',
					'italic',
					{ indent: '-1' },
					{ indent: '+1' },
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ script: 'super' },
					{ script: 'sub' },
					{ size: ['small', false, 'large', 'huge'] },
					'formula',
				],
			],
		},
		formats: ['bold', 'italic', 'indent', 'list', 'script', 'size', 'formula'],
	})

	return (
		<div className="quill-page">
				<div ref={quillRef} />
		</div>
	)
}

export default NotebookPage
