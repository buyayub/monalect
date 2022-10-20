import { cache } from 'src/shared/cache'
import { get } from 'idb-keyval'

export const getPages = async (courseId) => {
	const key = `course-${courseId}`

	let course = cache.get(key)
	if (course && course.lessons){
		let pages = []
		for (const lesson of course.lessons) {
			if (lesson.pages) {
				pages = [...pages, ...lesson.pages]
			}
		}
		if (pages.length > 0) return pages
	}

	console.warn(`Notebook not found in course-${courseId} cache.`)

	const notebookPages = await get('notebookPage')
	const lessons = await get('lesson')
	if (notebookPages) {
		const pages = notebookPages
			.filter((page) => page.courseId == courseId)
			.map((page) => {
				const lesson = lessons.find((lesson) => lesson.id == page.lessonId)
				if (!lesson) console.error(`lesson not found for page ${page.id}`)
				page.lessonTitle = lesson.title
				page.index = lesson.index
				return page
			})

		;(async () => {
			cache.apply((key), (val) => {
				let newCourse = val
				if (!newCourse.lessons) {
					console.error(`No lessons in cache ${key}, can't cache notebook.`)
					return newCourse
				}
				for (let lesson of newCourse.lessons) {
					lesson.pages = pages.filter((page) => page.lessonId == lesson.id)
				}
				return newCourse
			})
		})()

		return pages
	}
}
