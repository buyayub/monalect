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
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'
import { CREATE_BATCH } from 'src/shared/queries'


const CreateCoursePage = () => {
	const { currentUser } = useAuth()
	const [page, setPage] = useState(0)
	const [title, setTitle] = useState('')
	const [materials, setMaterial] = useState([])
	const [uploaded, setUploaded] = useState([])
	const [lessons, setLessons] = useState([])
	const [courseId, setCourseId] = useState(null)
	const [uploading, setUploading] = useState(false)

	const [showMaterialForm, setMaterialForm] = useState(false)
	const [showSectionForm, setSectionForm] = useState(false)
	const [showLessonForm, setLessonForm] = useState(false)

	const [sectionRoot, setSectionRoot] = useState(0)
	const [lessonRoot, setLessonRoot] = useState(0)

	const [linkMode, setLinkMode] = useState(false)
	const [identifier, setIdentifier] = useState(0)

	const materialDelete = (id) => {
		setUploaded(
			uploaded.filter((element) => element.localId != materials[id].localId)
		)
		setMaterial(materials.filter((element, index) => index != id))
	}

	const sectionDelete = (materialId, id) => {
		// remove material
		let materialsCopy = materials
		materialsCopy[materialId].sections = materialsCopy[
			materialId
		].sections.filter((element, index) => index != id)

		// recreate the array so react knows to re-render
		setMaterial([...materialsCopy])

		//remove section links
		let lessonsCopy = lessons
		let lessonIndex = 0
		let materialIndex = 0

		for (lesson of lessonsCopy) {
			for (lessonMaterial of lesson.material) {
				if (lessonMaterial.type == 'section') {
					if (
						lessonMaterial.materialId == materialId &&
						lessonMaterial.sectionId == id
					) {
						unlinkSection(lessonIndex, materialIndex)
					}
				} else if (lessonMAterial.type == 'article') {
					if (lessonMaterial.materialId == materialId) {
						unlinkSection(lessonIndex, materialIndex)
					}
				}
				materialIndex += 1
			}
			lessonIndex += 1
			materialIndex = 0
		}
	}

	const addMaterial = (material) => {
		setMaterial([...materials, material])
	}

	const addSection = (section, materialId) => {
		let materialsCopy = materials
		materialsCopy[materialId].sections.push(section)
		setMaterial([...materialsCopy])
	}

	const addLesson = (lesson) => {
		setLessons([...lessons, lesson])
	}

	const deleteLesson = (id) => {
		setLessons(lessons.filter((element, index) => index != id))
	}

	const linkSection = (lesson, sectionType, materialId, sectionId = null) => {
		let lessonsCopy = lessons
		if (sectionType == 'section') {
			for (const section of lessons[lesson].material) {
				if (
					section.materialId == materialId &&
					section.sectionId == sectionId
				) {
					return null
				}
			}

			lessonsCopy[lesson].material.push({
				type: 'section',
				materialId: materialId,
				sectionId: sectionId,
			})
		} else if (sectionType == 'article') {
			for (const section of lessons[lesson].material) {
				if (section.materialId == materialId) {
					return null
				}
			}

			lessonsCopy[lesson].material.push({
				type: 'article',
				materialId: materialId,
			})
		}
		setLessons([...lessonsCopy])
	}

	const unlinkSection = (lessonIndex, i) => {
		let lessonsCopy = lessons
		lessonsCopy[lessonIndex].material = lessonsCopy[
			lessonIndex
		].material.filter((element, index) => index != i)

		// recreate the array so react knows to re-render
		setLessons([...lessonsCopy])
	}

	const addUploaded = (file, localId) => {
		const newUploaded = uploaded
		newUploaded.push({ file: file, localId: localId })
		setUploaded([...newUploaded])
	}

	const [createBatch] = useMutation(CREATE_BATCH)

	const submitCourse = (courseTitle, courseMaterials, courseLessons) => {
		// We have to translate all the ids in the lesson material from their location in the array, to their local identifiers
		// We have to deepcopy here, so it doesn't overwrite the actual lessons state
		let linkedLessons = JSON.parse(JSON.stringify(lessons))

		for (let lesson of linkedLessons) {
			let links = []
			if (lesson.material.length > 0) {
				for (const reference of lesson.material) {
					if (reference.type == 'section') {
						links.push(
							materials[reference.materialId].sections[reference.sectionId]
								.localId
						)
					} else if (reference.type == 'article') {
						links.push(materials[reference.materialId].localId)
					}
				}
			}
			lesson.material = links
		}

		let index = 0

		for (let lesson of linkedLessons) {
			lesson.index = index
			index += 1
		}

		let input = {
			userId: currentUser.id,
			title: title,
			material: materials,
			lesson: linkedLessons,
		}

		createBatch({ variables: { input: input } }).then((response) => {
			// Upload textbook, send success
			const uploadArray = response.data.createBatchCourse

			// search through uploaded record, get the file, upload it
			for (let item of uploadArray) {
				const stuff = uploaded.find((e) => e.localId == item.localId)
				uploadTextbook(stuff.file, item.presigned)
			}

			// go to home
			navigate(routes.home())
		})
	}

	const uploadTextbook = (file, url) => {
		var data = new FormData()
		data.append('file', file)
		fetch(url, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/pdf',
			},
			body: data,
		})
	}

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
						setTitle(e.target.value)
					}}
				/>
				<div className="mn-flex-row mn-gap-large mn-justify-space-around mn-grow">
					<MaterialWrapper
						className="mn-layout-half"
						materials={materials}
						showForm={() => setMaterialForm(true)}
						showSection={() => setSectionForm(true)}
						materialDelete={materialDelete}
						sectionDelete={sectionDelete}
						setSectionRoot={setSectionRoot}
						linkMode={linkMode}
						lessonRoot={lessonRoot}
						linkSection={linkSection}
					/>
					<LessonWrapper
						className="mn-layout-half"
						lessons={lessons}
						materials={materials}
						setLessonForm={setLessonForm}
						setLessonRoot={setLessonRoot}
						deleteLesson={deleteLesson}
						setLinkMode={setLinkMode}
						linkMode={linkMode}
						lessonRoot={lessonRoot}
						unlinkSection={unlinkSection}
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
								setUploading(true)
								submitCourse(title, materials, lessons)
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
					addMaterial={addMaterial}
					identifier={identifier}
					setIdentifier={setIdentifier}
					addUploaded={addUploaded}
				/>
			</Modal>
			<Modal
				title="Textbook Section"
				show={showSectionForm}
				changeState={() => setSectionForm(false)}
			>
				<SectionForm
					cancel={() => setSectionForm(false)}
					addSection={addSection}
					sectionRoot={sectionRoot}
					identifier={identifier}
					setIdentifier={setIdentifier}
				/>
			</Modal>
			<Modal
				title="Add Lesson"
				show={showLessonForm}
				changeState={() => setLessonForm(false)}
			>
				<LessonForm
					cancel={() => setLessonForm(false)}
					addLesson={addLesson}
					identifier={identifier}
					setIdentifier={setIdentifier}
				/>
			</Modal>
		</>
	)
}

export default CreateCoursePage
