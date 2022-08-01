import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import TextInput from 'src/components/TextInput'
import MaterialWrapper from 'src/components/MaterialWrapper'
import LessonWrapper from 'src/components/LessonWrapper'
import LearningMaterialForm from 'src/components/LearningMaterialForm'
import SectionForm from 'src/components/SectionForm'
import LessonForm from 'src/components/LessonForm'
import Modal from 'src/components/Modal'

import { bcMain } from 'src/shared/breadcrumbs'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

const mockMaterials = [
	{
		type: 'textbook',
		title: 'Proof of Mathematics',
		isbn: '9780989472128',
		author: 'Richard Hammack',
		pages: 315,
		offset: 12,
		sections: [
			{
				title: 'Introduction',
				id: null,
				lesson: null,
				start: 1,
				end: 16,
			},
			{
				title: 'Set Theory',
				id: null,
				start: 42,
				end: 62,
			},
		],
	},
	{
		type: 'article',
		title: 'Summation',
		doi: 'https://doi.org/10.1016/S0747-7171(85)80038-9',
		author: 'Anonymous',
		offset: 0,
		pages: 14,
	},
]

const mockLessons = [
	{
		title: 'Intro to Mathematical Logic',
		id: null,
		sections: [
			{
				type: 'section',
				materialId: 0,
				sectionId: 0,
				id: null,
			},
			{
				type: 'article',
				materialId: 1,
				id: null,
			},
		],
	},
	{
		title: 'Set Theory',
		id: null,
		sections: [],
	},
]

const CREATE_COURSE = gql`
	mutation CreateCourseMutation($input: CreateCourseInput!) {
		createCourse(input: $input) {
			id
		}
	}
`

const CREATE_LESSON = gql`
	mutation CreateLessonMutation($input: CreateLessonInput!) {
		createLesson(input: $input) {
			id
		}
	}
`

const CREATE_TEXTBOOK = gql`
	mutation CreateTextbookMutation($input: CreateTextbookInput!) {
		createTextbook(input: $input) {
			id
		}
	}
`
const CREATE_TEXTBOOK_SECTION = gql`
	mutation CreateTextbookSectionMutation($input: CreateTextbookSectionInput!) {
		createTextbookSection(input: $input) {
			id
		}
	}
`
const CREATE_ARTICLE = gql`
	mutation CreateArticleMutation($input: CreateArticleInput!) {
		createArticle(input: $input) {
			id
		}
	}
`

const CREATE_SECTION_ON_LESSON = gql`
	mutation CreateSectionOnLessonMutation($input: CreateSectionOnLessonInput!) {
		createSectionOnLesson(input: $input) {
			lessonId
			sectionId
		}
	}
`

const CreateCoursePage = () => {
	const { currentUser } = useAuth()

	const [page, setPage] = useState(0)
	const [title, setTitle] = useState('')
	const [materials, setMaterial] = useState([])
	const [lessons, setLessons] = useState([])
	const [courseId, setCourseId] = useState(null)

	const [showMaterialForm, setMaterialForm] = useState(false)
	const [showSectionForm, setSectionForm] = useState(false)
	const [showLessonForm, setLessonForm] = useState(false)

	const [sectionRoot, setSectionRoot] = useState(0)
	const [lessonRoot, setLessonRoot] = useState(0)

	const [linkMode, setLinkMode] = useState(false)

	const materialDelete = (id) => {
		setMaterial(materials.filter((element, index) => index != id))
	}

	const sectionDelete = (materialId, id) => {
		let materialsCopy = materials
		materialsCopy[materialId].sections = materialsCopy[
			materialId
		].sections.filter((element, index) => index != id)

		// recreate the array so react knows to re-render
		setMaterial([...materialsCopy])
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
			for (const section of lessons[lesson].sections) {
				if (section.materialId == materialId && section.id == sectionId) {
					return null
				}
			}

			lessonsCopy[lesson].sections.push({
				type: 'section',
				materialId: materialId,
				sectionId: sectionId,
				id: null
			})
		} else if (sectionType == 'article') {
			for (const section of lessons[lesson].sections) {
				if (section.type == sectionType && section.materialId == materialId) {
					return null
				}
			}

			lessonsCopy[lesson].sections.push({
				type: 'article',
				materialId: materialId,
				id: null
			})
		}
		setLessons([...lessonsCopy])
	}

	const unlinkSection = (lessonIndex, i) => {
		let lessonsCopy = lessons
		lessonsCopy[lessonIndex].sections = lessonsCopy[
			lessonIndex
		].sections.filter((element, index) => index != i)

		// recreate the array so react knows to re-render
		setLessons([...lessonsCopy])
	}

	/* --------------- */
	/* API INTERACTION */
	/* --------------- */

	// these are all async, so we await later when submitting a course
	const [createCourse] = useMutation(CREATE_COURSE)
	const [createLesson] = useMutation(CREATE_LESSON)
	const [createTextbook] = useMutation(CREATE_TEXTBOOK)
	const [createTextbookSection] = useMutation(CREATE_TEXTBOOK_SECTION)
	const [createArticle] = useMutation(CREATE_ARTICLE)
	const [createSectionOnLesson] = useMutation(CREATE_SECTION_ON_LESSON)

	const submitCourse = async () => {
		//create course, then set course id
		createCourse({
			variables: { input: { title: title, userId: currentUser.id } },
		}).then((response) => {
			const newId = response.data.createCourse.id
			setCourseId(newId)
		})

		await submitTextbook(materials[0].title, 0);
		await submitTextbookSection(
				materials[0].sections[0].title, 
				materials[0].sections[0].start,
				materials[0].sections[0].end,
				materials[0].id,
				0,
				0
		)
		await linkSectionLesson(lessons[0].id, materials[0].sections[0].id, 0, 0)
		console.log(lessons);
		console.log(material);
	}

	useEffect(() => {
		submitLesson(lessons[0].title, 0);
	}, [courseId])

	useEffect(() => {
		submitTextbook(materials[0].title, 0);
	}, [lessons.id])

	useEffect(() => {
		submitTextbook(materials[0].title, 0);
	}, [lessons])

	const submitLesson = async (lessonTitle, lessonId) => {
		//create lesson, and update the id

		await createLesson({
			variables: {
				input: {
					title: lessonTitle,
					courseId: courseId,
					userId: currentUser.id,
				},
			},
		}).then((response) => {
			const newId = response.data.createLesson.id
			let lessonsCopy = lessons
			lessonsCopy[lessonId].id = newId
			setLessons([...lessonsCopy])
		})
	}

	const submitTextbook = async (
		textbookTitle,
		materialId,
		isbn = null,
		author = null,
		pages = null,
		pageOffset = null
	) => {
		//create textbook, and update the id
		//i'd use rest parameters but screw it

		let input = {
			title: textbookTitle,
			courseId: courseId,
			userId: currentUser.id,
		}

		if (isbn) {
			input.isbn = isbn
		}
		if (author) {
			input.author = author
		}
		if (pages) {
			input.pages = pages
		}
		if (pageOffset) {
			input.pageOffset = pageOffset
		}

		createTextbook({
			variables: { input: input },
		}).then((response) => {
			const newId = response.data.createTextbook.id
			let materialsCopy = materials
			materialsCopy[materialId].id = newId
			setMaterial([...materialsCopy])
		})
	}

	const submitTextbookSection = async (
		sectionTitle,
		sectionStart,
		sectionEnd,
		textbookId,
		materialId,
		sectionId
	) => {
		createTextbookSection({
			variables: {
				input: {
					userId: currentUser.id,
					title: sectionTitle,
					start: sectionStart,
					end: sectionEnd,
					textbookId: textbookId,
				},
			},
		}).then((response) => {
			const newId = response.data.createTextbookSection.id
			let materialsCopy = materials
			materialsCopy[materialId].sections[sectionId].id = newId
			setMaterial([...materialsCopy])
		})
	}

	const submitArticle = async (articleTitle, materialId, uploaded = false) => {
		createArticle({
			variables: {
				input: {
					userId: currentUser.id,
					title: articleTitle,
					uploaded: uploaded,
					courseId: courseId,
				},
			},
		})
		.then((response) => {
			const newId = response.data.createArticle.id	
			let materialsCopy = materials
			materialsCopy[materialId].id = newId
			setMaterial([...materialsCopy])
		})
	}
	
	const linkSectionLesson = async (lessonId, sectionId, frontLessonId, frontSectionId) => {
		createSectionOnLesson({
				variables: {
					input: {
						lessonId: lessonId,
						sectionId: sectionId
					}
				}
		})
		.then((response) => {
			const newId = response.data.createSectionOnLesson.id	
			let lessonsCopy = lessons
			lessonsCopy[frontLessonId].sections[frontSectionId].id = newId
			setLessons([...lessonsCopy])
		})
	}
	

	return (
		<>
			<MetaTags title="CreateCourse" description="CreateCourse page" />
			<NavBar breadcrumbs={[bcMain]} />
			<TextInput
				label="Title"
				onChange={(e) => {
					setTitle(e.target.value)
				}}
			/>
			<div class="mn-c-page">
				<MaterialWrapper
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
			<Button>Cancel</Button>
			<Button onClick={() => submitCourse(title, materials, lessons)}>
				Create
			</Button>
			<Modal show={showMaterialForm} changeState={() => setMaterialForm(false)}>
				<LearningMaterialForm
					cancel={() => {
						setMaterialForm(false)
					}}
					addMaterial={addMaterial}
				/>
			</Modal>
			<Modal show={showSectionForm} changeState={() => setSectionForm(false)}>
				<SectionForm
					cancel={() => setSectionForm(false)}
					addSection={addSection}
					sectionRoot={sectionRoot}
				/>
			</Modal>
			<Modal show={showLessonForm} changeState={() => setLessonForm(false)}>
				<LessonForm cancel={() => setLessonForm(false)} addLesson={addLesson} />
			</Modal>
		</>
	)
}

export default CreateCoursePage
