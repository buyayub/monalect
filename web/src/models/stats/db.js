import { get, getMany } from 'idb-keyval'

export const getCourseWords = async (courseId) => {
	const data = await get('notebookPage')
	if (data) {
		let words = 0
		for (const item of data) {
			words += item.words * (item.courseId == courseId)
		}
		return words
	}
	console.warn('idb: no notebookPage table.')
}

export const getLessonCount = async(courseId) => {
	const data = await get('lesson')
	if (data) {
		let lessons = 0
		for (const item of data) lessons += item.courseId == courseId
		return lessons
	}
	console.warn('idb: no lesson table.')
}

export const getQuestionCount = async (courseId) => {
	const data = await get('question')
	if (data) {
		let questions = 0
		for (const item of data) questions += item.courseId == courseId
		return questions
	}
	console.error('idb: no question table')
}


export const getLessonWordCount = async (lessonId) => {
	let pages = await get('notebookPage');
	if (pages) {
		const page = pages.find((page) => page.lessonId == lessonId);
		if (!page) console.warn(`Lesson ${lessonId} does not have a corresponding notebook page in client database.`)

		let count = page ? page.words : 0

		return count
	}
	console.warn('idb: no notebookPage table.')
}

export const getLessonQuestionCount = async(lessonId) => {
	const data = await get('question')
	if (data) {
		let questions = 0
		for (const item of data) questions += item.lessonId == lessonId
		return questions
	}
	console.error('idb: no question table')
}
