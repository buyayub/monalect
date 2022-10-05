import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@apollo/client'
import IconButton from 'src/components/IconButton'
import Button from 'src/components/Button'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'

import { FiHelpCircle, FiList } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'
import { deleteCourse } from 'src/controller/course'

const CourseCard = ({
	courseId,
	courseTitle = 'Untitled',
	courseDescription = 'No description.',
	notebookWords = 0,
	questionCount = 0,
	mark = 0,
	lessons = 0,
	edit = true,
	handleDelete=null,
}) => {
	const [editDescription, setEditDescription] = useState(false)
	const [editTitle, setEditTitle] = useState(false)
	const [title, setTitle] = useState(courseTitle)
	const [description, setDescription] = useState(courseDescription)
	const { currentUser } = useAuth()

	const descriptionForm = useRef(null)
	const titleForm = useRef(null)

	const submitUpdate = () => {}

	const submitDelete = () => {
		deleteCourse(courseId)
		handleDelete(courseId)
	}

	// focus on title if edit is true and toggled, place caret at the end

	const moveCaretEnd = (element) => {
		if (
			typeof window.getSelection != 'undefined' &&
			typeof document.createRange != 'undefined'
		) {
			var range = document.createRange()
			range.selectNodeContents(element)
			range.collapse(false)
			var sel = window.getSelection()
			sel.removeAllRanges()
			sel.addRange(range)
		} else if (typeof document.body.createTextRange != 'undefined') {
			var textRange = document.body.createTextRange()
			textRange.moveToElementText(element)
			textRange.collapse(false)
			textRange.select()
		}
	}

	useEffect(() => {
		if (editDescription && descriptionForm) {
			descriptionForm.current.focus()
			moveCaretEnd(descriptionForm.current)
		}

		if (editTitle && titleForm) {
			titleForm.current.focus()
			moveCaretEnd(titleForm.current)
		}
	}, [editDescription, editTitle])

	return (
		<>
			{!edit ? (
				// VIEW MODE
				<Link
					to={routes.courseHome({
						courseId: courseId,
						courseTitle: courseTitle,
						questionCount: questionCount,
						notebookWord: notebookWords,
						mark: mark,
					})}
				>
					<div className="mn-c-card">
						<div className="mn-flex-column mn-gap-small">
							<div className="mn-flex-row mn-justify-space-between">
								<h2>{title}</h2>
								<h3>{mark}%</h3>
							</div>
							<div>{description}</div>
							<div className="mn-flex-row mn-gap-large mn-justify-end">
								<div className="mn-flex-row mn-gap-small">
									<FiList />
									<p>{lessons}</p>
								</div>
								<div className="mn-flex-row mn-gap-small">
									<RiBook2Line />
									<p>{notebookWords}</p>
								</div>
								<div className="mn-flex-row mn-gap-small">
									<FiHelpCircle />
									<p>{questionCount}</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			) : (
				// EDIT MODE
				<div className="mn-c-card mn-flex-grow">
					<div className="mn-flex-column mn-gap-small">
						<div className="mn-flex-row mn-justify-space-between">
							{editTitle ? (
								<span
									className="mn-c-text-input mn-h2"
									ref={titleForm}
									contentEditable={true}
									onBlur={(e) => {
										if (e.target.textContent != title)
											submitUpdate(e.target.textContent)
										setEditTitle(false)
									}}
									onKeyDown={(e) => {
										if (e.key == 'Enter') {
											e.preventDefault()

											// If title changed, update it
											if (e.target.textContent != title)
												submitUpdate(e.target.textContent)

											e.target.textContent = ''
											setEditTitle(false)
										}

										if (e.key == 'Escape') {
											e.preventDefault()
											setEditTitle(false)
										}
									}}
								>
									{title}
								</span>
							) : (
								<h2
									className="mn-clickable"
									onClick={() => {
										setEditTitle(true)
									}}
								>
									{title}
								</h2>
							)}
							<div className="mn-flex-row mn-align-center mn-align-self-start">
								<Button onClick={() => submitDelete()}className="mn-is-danger mn-is-small">Delete</Button>
							</div>
						</div>
						{editDescription ? (
							<span
								className="mn-c-text-input"
								ref={descriptionForm}
								contentEditable={true}
								onBlur={(e) => {
									if (e.target.textContent != description)
										submitUpdate(null, e.target.textContent)
									setEditDescription(false)
								}}
								onKeyDown={(e) => {
									if (e.key == 'Enter') {
										e.preventDefault()

										// if description changed, update it
										if (e.target.textContent != description)
											submitUpdate(null, e.target.textContent)

										e.target.textContent = ''
										setEditDescription(false)
									}

									if (e.key == 'Escape') {
										e.preventDefault()
										setEditDescription(false)
									}
								}}
							>
								{description}
							</span>
						) : (
							<div
								className="mn-clickable"
								onClick={() => {
									setEditDescription(true)
								}}
							>
								{description}
							</div>
						)}
						<div className="mn-flex-row mn-gap-large mn-justify-end">
							<div className="mn-flex-row mn-gap-small">
								<FiList />
								<p>{lessons}</p>
							</div>
							<div className="mn-flex-row mn-gap-small">
								<RiBook2Line />
								<p>{notebookWords}</p>
							</div>
							<div className="mn-flex-row mn-gap-small">
								<FiHelpCircle />
								<p>{questionCount}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default CourseCard
