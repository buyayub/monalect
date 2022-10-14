import { useQuill } from 'react-quilljs'
import { useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import 'quill/dist/quill.snow.css'
import { useAuth } from '@redwoodjs/auth'
import { useParams, useLocation } from '@redwoodjs/router'
import { updatePage } from 'src/controller/notebook'
import { useApolloClient } from '@apollo/client'

const NotebookPage = ({ page, courseId }) => {
	const timeout = 2
	const [timer, setTimer] = useState(0)
	const [saved, setSaved] = useState(true)
	const [loaded , setLoaded ] = useState(false)
	const { currentUser } = useAuth()
	const [updateStuff, setUpdateStuff] = useState(false)
	const [wordCount, setWordCount] = useState(page.words)
	const client = useApolloClient()

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
		let words = getWords()
		setWordCount(getWords())
		let newContent = JSON.stringify(quill.getContents())
		let input = {
			id: page.id,
			words: words,
			content: newContent,
			lessonId: page.lessonId,
		}
		updatePage(client, currentUser.id, courseId, input)
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
			quill.setContents(JSON.parse(page.content))
			quill.on('text-change', () => {
				setTimer(timeout)
				setSaved(false)
			})
			setLoaded(true)
			setWordCount(getWords())
		}
	}, [quill, updateStuff])

	useEffect(() => {
		if (quill && page.content != quill.getContents()) {
			setUpdateStuff(!updateStuff)
		}
	}, [page.content])

	console.log(loaded)
	return (
		<>
			<div className={`${loaded ? 'mn-is-fadein' : 'mn-is-fadeout'} mn-flex-column mn-gap-small`}>
				<div className="mn-flex-row mn-justify-space-between">
					<h3>
						{page.index}. {page.lessonTitle}{' '}
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
