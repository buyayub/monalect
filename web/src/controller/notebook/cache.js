import { cache } from 'src/shared/cache'

export const updatePage = (courseId, input) => {
	// 	input: id, content, words, lessonId

	const key = `course-${courseId}`
	cache.apply(key, (item) => {
		let course = item
		let page = course.lessons
			.find((item) => item.id == input.lessonId)
			.pages.find((item) => item.id == input.id)
		if (input.content) page.content = input.content
		if (input.words) page.words = input.words
		return course
	})

	if (input.words) updateWords(courseId, input.lessonId, input.words)
}

export const updateWords = (courseId, lessonId, words) => {
	const key = `course-${courseId}`
	cache.apply(key, (item) => {
		let course = item
		let lesson = course.lessons.find((item) => item.id == lessonId)
		course.words = words
		lesson.words = words
		return course
	})

	cache.apply(`course-cards`, (cards) => {
		let card = cards.find((card) => card.id == courseId)
		card.notebookWords = words
		return cards
	})
}
