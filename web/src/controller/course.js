import { get, getMany, setMany, update } from 'idb-keyval'
import { useApolloClient } from '@apollo/client'

export const deleteCourse = async (courseId) => {
	localStorage.removeItem(`course-${courseId}`)
	sessionStorage.removeItem(`course-${courseId}`)
	localStorage.removeItem(`${courseId}-stats`)
	sessionStorage.removeItem(`${courseId}-stats`)

	deleteCourseDB(courseId)

	let cards = localStorage.getItem('course-cards')
	if (cards) {
		cards = JSON.parse(cards).filter((card) => card.id != courseId)
		localStorage.setItem('course-cards', JSON.stringify(cards))
		sessionStorage.setItem('course-cards', JSON.stringify(cards))
	}

	let dropdown = localStorage.getItem('course-dropdown')
	if (dropdown) {
		dropdown = JSON.parse(dropdown).filter((item) => item.value != courseId)
		localStorage.setItem('course-dropdown', JSON.stringify(dropdown))
		sessionStorage.setItem('course-dropdown', JSON.stringify(dropdown))
	}

	console.log(`course ${courseId} deleted from web storage`)
}

const deleteCourseDB = async (courseId) => {
	const [
		answer,
		article,
		articleOnLesson,
		course,
		lesson,
		notebookPage,
		question,
		section,
		sectionOnLesson,
		test,
		testOnLesson,
		textbook,
	] = await getMany([
		'answer',
		'article',
		'articleOnLesson',
		'course',
		'lesson',
		'notebookPage',
		'question',
		'section',
		'sectionOnLesson',
		'test',
		'testOnLesson',
		'textbook',
	])

	let db = {}

	// easy stuff first

	db.course = course.filter((item) => item.id != courseId)
	db.article = article.filter((item) => item.courseId != courseId)
	db.lesson = lesson.filter((item) => item.courseId != courseId)
	db.notebookPage = notebookPage.filter((item) => item.courseId != courseId)
	db.question = question.filter((item) => item.courseId != courseId)
	db.test = test.filter((item) => item.courseId != courseId)
	db.textbook = textbook.filter((item) => item.courseId != courseId)

	// now the hard stuff (answer, XOnX)

	let del = {}
	// we get a list of ids
	del.question = question
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)
	del.lesson = lesson
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)
	del.textbook = textbook
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)

	// use the list of ids to filter
	db.answer = answer.filter((item) => !del.question.includes(item.questionId))
	db.section = answer.filter((item) => !del.textbook.includes(item.textbookId))
	db.sectionOnLesson = sectionOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)
	db.articleOnLesson = articleOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)
	db.testOnLesson = testOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)

	const keys = Object.keys(db)
	const values = Object.values(db)
	let elements = []
	for (let i = 0; i < keys.length; i++) elements.push([keys[i], values[i]])

	await setMany(elements)

	console.log(`course ${courseId} deleted from idb`)

	// never do your own cascades
}

// course: id, title, description
export const updateCourse = (input) => {
	const key = `course-${input.id}`
	let data = JSON.parse(localStorage.getItem(key))

	if (data) {
		if (input.title) data.title = input.title
		if (input.description) data.description = input.description
		localStorage.setItem(key, JSON.stringify(data))
		sessionStorage.setItem(key, JSON.stringify(data))
	}

	updateCourseCard({id: input.id, title: input.title, description: input.description})

	update('course', (courses) => {
		const index = courses.findIndex((item) => item.id == input.id)
		if (input.title) courses[index].title = input.title
		if (input.description) courses[index].description = input.description
		return courses
	})

}

export const updateCourseCard = (input) => {
	const key = `course-cards`

	let data = JSON.parse(localStorage.getItem(key))
	if (data) {
		const index = data.findIndex(item => item.id == input.id) 
		if (input.title) data[index].title = input.title
		if (input.description) data[index].description = input.description

		localStorage.setItem(key, JSON.stringify(data))
		sessionStorage.setItem(key, JSON.stringify(data))
	}
}

