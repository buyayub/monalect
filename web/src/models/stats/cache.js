import { cache } from 'src/shared/cache'

export const getCourseWords = (courseId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.words) {
		return course.words
	}
}

export const getLessonCount = (courseId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.lessons) {
		return course.lessons.length
	}
}

export const getQuestionCount = (courseId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.lessons) {
		let length = 0
		for (let lesson of course.lessons) {
			if (lesson.questions) length += lessons.questions.length
		}
		return length
	}
}

export const getLessonWordCount = (courseId, lessonId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.lessons) {
		const lesson = course.lessons.find((lesson) => lesson.id == lessonId)
		let words = 0
		if (lesson.pages) {
			for (let page of lesson.pages)
				words += page.words
		}
		return words
	}
}

export const getLessonQuestionCount = (courseId, lessonId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.lessons) {
		const lesson = course.lessons.find((lesson) => lesson.id == lessonId)
		if (lesson.questions)
			return lesson.questions.length
		console.warn("No questions entry in lesson w/ id ", lessonId)
}
