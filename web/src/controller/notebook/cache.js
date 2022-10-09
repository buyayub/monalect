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
}
