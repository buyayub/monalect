import { cache } from 'src/lib/cache'

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

export const getMark = (courseId) => {
	const course = cache.get(`course-${courseId}`)
	let tests = []

	if (!course.tests || !course.lessons) return null

	for (let test of course.tests) {
		tests = [...tests, ...test.tests]
	}

	// sort by date
	tests.sort((a, b) => (a.date > b.date) ? 1 : -1)

	let lessons = course.lessons
	let count = 0
	let correct = 0

	// after we sort it by most recent, we find first lesson we can find (most recent)  
	// and add the marks
	for (let lesson of lessons) {
		const test = tests.find((test) => test.lessonId == lesson.id)
		if (test) {
			count += test.count
			correct += test.correct
		}
	}

	// the reason we keep the count and correct instead of just using a mark
	// is because marks can't be iteratively averaged by their own mean and count
	// it's a little counterintuitive
	return Math.floor((correct / count) * 100)
}

const getLessonMark = (courseId, lessonId) = {
	const course = cache.get(`course-${courseId}`)
	let tests = []
	for (let test of course.tests) {
		tests = [...tests, ...test.tests]
	}
	tests.sort((a, b) => (a.date > b.date) ? 1 : -1)
	
	const lesson = course.lessons.find((lesson) => lesson.id == lessonId)

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
			for (let page of lesson.pages) words += page.words
		}
		return words
	}
}

export const getLessonQuestionCount = (courseId, lessonId) => {
	const course = cache.get(`course-${courseId}`)
	if (course && course.lessons) {
		const lesson = course.lessons.find((lesson) => lesson.id == lessonId)
		if (lesson.questions) return lesson.questions.length
		console.warn('No questions entry in lesson w/ id ', lessonId)
	}
}
