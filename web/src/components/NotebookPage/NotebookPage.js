import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useParams, useLocation } from '@redwoodjs/router'

const SAVE_CONTENT = gql`
	mutation UpdateNotebookPage(
		$userId: Int!
		$id: Int!
		$input: UpdateNotebookPageInput!
	) {
		updateNotebookPage(userId: $userId, id: $id, input: $input)
	}
`

const NotebookPage = ({ title, content, id }) => {
	const timeout = 2
	const [timer, setTimer] = useState(0)
	const [saved, setSaved] = useState(true)
	const [saveContent] = useMutation(SAVE_CONTENT)
	const { currentUser } = useAuth()
	const [updateStuff, setUpdateStuff] = useState(false)

	const { pathname } = useLocation()

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

	const submitPage = () => {
		let page = 0
		let words = quill
			.getText()
			.split(/\n| |\t/)
			.filter((e) => e != '').length
		let newContent = JSON.stringify(quill.getContents())
		saveContent({
			variables: {
				userId: currentUser.id,
				id: id,
				input: {
					words: words,
					content: newContent,
				},
			},
		})
	}

	// 5 second timer, if it hits 0, then we save changes. It's reset onChange by the text editor.

	useEffect(() => {
		let interval = null

		if (timer > 0 && !saved) {
			interval = setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)
		}
		if (timer == 0 && saved != true) {
			setSaved(true)
			submitPage()
		}
		return () => {
			window.clearTimeout(interval)
		}
	}, [timer, saved])

	// reset timer to 5 on change
	// quill initialization

	console.log(title, " Update: ", content)

	useEffect(() => {
		if (quill) {
			console.log(title, " Effect: ", content)
			quill.setContents(JSON.parse(content))
			quill.on('text-change', () => {
				setTimer(timeout)
				setSaved(false)
			})
		}
	}, [quill, updateStuff])

	useEffect(() => {
		if (quill && content != quill.getContents()) {
			setUpdateStuff(!updateStuff)
		}
	}, [content])

	return (
		<>
			<div className="quill-page">
				<div ref={quillRef} />
			</div>
			<p className="saved">{saved ? 'Saved' : 'Unsaved...'}</p>
		</>
	)
}

export default NotebookPage
