import { get, getMany } from 'idb-keyval'

export const getCourseWords = async (courseId) => {
	const key = `${courseId}-stats`

	// gets course stats and returns if it contains the words
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.words) {
		return stats.words
	}

	// if there isn't, we have to create them from indexedDB
	const data = await get('notebookPage')
	if (data) {
		let words = 0
		for (const item of data) {
			words += item.words * (item.courseId == courseId)
		}

		// add it to session and local storage
		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, words: words }))
				localStorage.setItem(key, JSON.stringify({ ...stats, words: words }))
			} else {
				sessionStorage.setItem(key, JSON.stringify({ words: words }))
				localStorage.setItem(key, JSON.stringify({ words: words }))
			}
		})();

		return words
	}

	// if there isn't any notebookPages entry, we throw an exception for someone else to handle
	throw ReferenceError()
}

export const getLessonCount = async(courseId) => {
	const key = `${courseId}-stats`
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.lessons) {
		return stats.lessons
	}

	const data = await get('lesson')
	if (data) {
		let lessons = 0
		for (const item of data)
		{
			lessons += item.courseId == courseId
		}

		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, lessons: lessons}))
				localStorage.setItem(key, JSON.stringify({ ...stats, lessons: lessons}))
			} else {

				sessionStorage.setItem(key, JSON.stringify({ lessons: lessons}))
				localStorage.setItem(key, JSON.stringify({ lessons: lessons}))
				}
		})();

		return lessons
	}

	throw ReferenceError()
}

export const getQuestionCount = async(courseId) => {
	const key = `${courseId}-stats`
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.questions) {
		return stats.questions
	}

	const data = await get('question')
	if (data) {
		let questions = 0
		for (const item of data)
			questions += (item.courseId == courseId)

		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, questions: questions}))
				localStorage.setItem(key, JSON.stringify({ ...stats, questions: questions}))
			} else {

				sessionStorage.setItem(key, JSON.stringify({ questions: questions}))
				localStorage.setItem(key, JSON.stringify({ questions: questions}))
				}
		})();

		return questions
	}

	throw ReferenceError()
}

export const getCourseMark = async(courseId) => {
	const key = `${courseId}-stats`
}
