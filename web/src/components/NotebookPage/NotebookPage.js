import { useQuill } from 'react-quilljs'
import { useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import 'quill/dist/quill.snow.css'
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

const NotebookPage = ({ index, title, content, id }) => {
	const timeout = 2
	const [timer, setTimer] = useState(0)
	const [saved, setSaved] = useState(true)
	const [saveContent] = useMutation(SAVE_CONTENT)
	const { currentUser } = useAuth()
	const [updateStuff, setUpdateStuff] = useState(false)
	const [wordCount, setWordCount] = useState(0)

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
		theme: 'snow',
	})

	const getWords = () => {
		return quill
			.getText()
			.split(/\n| |\t/)
			.filter((e) => e != '').length
	}

	const submitPage = () => {
		let page = 0
		let words = getWords()
		setWordCount(getWords())
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
		if (timer == 0 && !saved) {
			setSaved(true)
			submitPage()
		}
		return () => {
			window.clearTimeout(interval)
		}
	}, [timer, saved])

	// reset timer to 5 on change
	// quill initialization

	useEffect(() => {
		if (quill) {
			quill.setContents(JSON.parse(content))
			quill.on('text-change', () => {
				setTimer(timeout)
				setSaved(false)
			})
			setWordCount(getWords())
		}
	}, [quill, updateStuff])

	useEffect(() => {
		if (quill && content != quill.getContents()) {
			setUpdateStuff(!updateStuff)
		}
	}, [content])

	return (
		<>
			<div className="mn-flex-column mn-gap-small">
				<div className="mn-flex-row mn-justify-space-between">
					<h3>
						{index}. {title}{' '}
					</h3>
					<p className="mn-align-self-end mn-padding-right-medium mn-secondary-text">
						{saved ? 'Saved' : 'Unsaved...'}
					</p>
				</div>
				<div>
					<div ref={quillRef} />
				</div>
				<p className="mn-text-blue mn-align-self-end mn-padding-right-small">
					{wordCount} words
				</p>
			</div>
		</>
	)
}

export default NotebookPage
