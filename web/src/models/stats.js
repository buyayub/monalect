import { get, getMany } from 'idb-keyval'
import { cache } from 'src/shared/cache'

export const getCourseWords = async (courseId) => {
	const key = `course-${courseId}`

	// gets course stats and returns if it contains the words
	const course = get(key)
	if (course && course.words) {
		return course.words
	}

	// if there isn't, we have to create them from indexedDB
	const data = await get('notebookPage')
	if (data) {
		let words = 0
		for (const item of data) {
			words += item.words * (item.courseId == courseId)
		}
		return words
	}

	// if there isn't any notebookPages entry, we message the error
	console.error('idb: no notebookPage table')
}

export const getLessonCount = async (courseId) => {
	const key = `course-${courseId}`
	const course = cache.get(key)
	if (course && course.lessons) {
		return course.lessons.length
	}

	const data = await get('lesson')
	if (data) {
		let lessons = 0
		for (const item of data) lessons += item.courseId == courseId
		return lessons
	}

	console.error('idb: no lesson table.')
}

export const getQuestionCount = async (courseId) => {
	const key = `course-${courseId}`
	const course = cache.get(key)
	if (course && course.questions) {
		return course.questions.length
	}

	const data = await get('question')
	if (data) {
		let questions = 0
		for (const item of data) questions += item.courseId == courseId
		return questions
	}

	console.error('idb: no question table')
}

export const getCourseMark = async (courseId) => {
	const key = `${courseId}-stats`
}
