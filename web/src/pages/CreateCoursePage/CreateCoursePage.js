import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'
import MaterialWrapper from 'src/components/MaterialWrapper'
import LessonWrapper from 'src/components/LessonWrapper'
import LearningMaterialForm from 'src/components/LearningMaterialForm'
import SectionForm from 'src/components/SectionForm'
import LessonForm from 'src/components/LessonForm'
import Modal from 'src/components/Modal'

import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { setUniqueId } from 'src/db'
import { cache } from 'src/shared/cache'
import { createBatch } from 'src/controller/batch'
import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

const CreateCoursePage = () => {
	const [page, setPage] = useState(0)
	const [uploading, setUploading] = useState(false)
	const { currentUser } = useAuth()
	const client = useApolloClient()

	const [course, setCourse] = useState({
		title: null,
		description: null,
		material: [],
		lesson: [],
		link: [],
		section: [],
	})

	const [showMaterialForm, setMaterialForm] = useState(false)
	const [showSectionForm, setSectionForm] = useState(false)
	const [showLessonForm, setLessonForm] = useState(false)

	const [sectionRoot, setSectionRoot] = useState(0)
	const [lessonRoot, setLessonRoot] = useState(0)

	const [linkMode, setLinkMode] = useState(false)

	// we do this to set a continual unique identifier in the case of creating another course while offline
	if (!sessionStorage.getItem('unique-id')) {
		setUniqueId().then(() => {
			// structuredClone() can deep copy while retaining the File object unlike JSON.stringify(). 
			// it's new though (88.1% support last time i checked) so TODO: create backup
			let courseCopy = structuredClone(course) 
			// give course an initial unique id
			;({ prev: courseCopy.localId } = cache.apply(
				'unique-id',
				(val) => val + 1
			)) / setCourse(courseCopy)
		})
	} else if (!course.localId) {
		// give course an initial unique id
		let courseCopy = structuredClone(course) // deep copy
		;({ prev: courseCopy.localId } = cache.apply(
			'unique-id',
			(val) => val + 1
		)) / setCourse(courseCopy)
	}

	const onSubmit = () => {
		let courseCopy = structuredClone(course) // deep copy

		// setup notebooks
		courseCopy.page = []
		if (!course.page) {
			course.lesson.forEach((lesson, i) => {
				const { prev: localId } = cache.apply('unique-id', (val) => val + 1)
				courseCopy.page.push({
					localId: localId,
					lessonId: lesson.localId,
					content: null,
					index: i,
					lessonTitle: lesson.title,
				})
			})
		}
		createBatch(courseCopy, client, currentUser.id)
	}

	const tools = {
		add: (type, item) => {
			;({ prev: item.localId } = cache.apply('unique-id', (val) => val + 1))
			let courseCopy = structuredClone(course) // deep copy

			courseCopy[type].push(item)
			setCourse(courseCopy)
		},
		delete: (type, id) => {
			let courseCopy = structuredClone(course) // deep copy
			courseCopy[type] = courseCopy[type].filter((item) => item.localId != id)

			// a few cascade deletions
			if (type == 'article' || type == 'section')
				courseCopy['link'] = courseCopy['link'].filter(
					(item) => item.materialId != id
				)
			if (type == 'lesson')
				courseCopy['link'] = courseCopy['link'].filter(
					(item) => item.lessonId != id
				)

			if (type == 'material') {
				courseCopy['section'] = courseCopy['section'].filter((section) => {
					// remove links before removing sections
					if (section.textbookId == id)
						courseCopy['link'] = courseCopy['link'].filter(
							(link) => link.materialId != section.localId
						)
					return section.textbookId != id
				})
			}

			setCourse(courseCopy)
		},
	}

	console.log("create course page: ", course)

	return (
		<>
			<MetaTags title="CreateCourse" description="CreateCourse page" />
			<header className="mn-padding-header mn-flex-row mn-align-center mn-justify-space-between">
				<NavBar />
			</header>
			<div
				className={`mn-padding-page mn-flex-column mn-gap-large ${
					uploading ? 'mn-wait' : ''
				}`}
			>
				<TextInput
					className="mn-form-width-medium"
					label="Course Title:"
					onChange={(e) => {
						let courseCopy = course
						courseCopy['title'] = e.target.value
						setCourse(courseCopy)
					}}
				/>
				<p> Sectionroot: {sectionRoot} </p>
				<div className="mn-flex-row mn-gap-large mn-justify-space-around mn-grow">
					<MaterialWrapper
						className="mn-layout-half"
						course={course}
						showForm={() => setMaterialForm(true)}
						showSection={() => setSectionForm(true)}
						tools={tools}
						setSectionRoot={setSectionRoot}
						linkMode={linkMode}
						lessonRoot={lessonRoot}
					/>
					<LessonWrapper
						className="mn-layout-half"
						course={course}
						tools={tools}
						setLessonForm={setLessonForm}
						setLessonRoot={setLessonRoot}
						setLinkMode={setLinkMode}
						linkMode={linkMode}
						lessonRoot={lessonRoot}
					/>
				</div>
			</div>
			<footer className="mn-c-sticky-footer mn-flex-row mn-justify-end mn-padding-small mn-gap-medium">
				{uploading ? (
					"Creating... (don't exit)"
				) : (
					<>
						<Button
							className="mn-is-danger"
							onClick={() => {
								navigate(routes.home())
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								onSubmit()
							}}
						>
							Create
						</Button>
					</>
				)}
			</footer>
			<Modal
				title="Add Material"
				show={showMaterialForm}
				changeState={() => setMaterialForm(false)}
			>
				<LearningMaterialForm
					cancel={() => {
						setMaterialForm(false)
					}}
					tools={tools}
				/>
			</Modal>
			<Modal
				title="Textbook Section"
				show={showSectionForm}
				changeState={() => setSectionForm(false)}
			>
				<SectionForm
					cancel={() => setSectionForm(false)}
					tools={tools}
					sectionRoot={sectionRoot}
				/>
			</Modal>
			<Modal
				title="Add Lesson"
				show={showLessonForm}
				changeState={() => setLessonForm(false)}
			>
				<LessonForm cancel={() => setLessonForm(false)} tools={tools} />
			</Modal>
		</>
	)
}

export default CreateCoursePage
