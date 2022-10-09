import { cache } from 'src/shared/cache'
import { get } from 'idb-keyval'

export const getQuestions = async (courseId) => {
	const key = `course-${courseId}`
	let course = cache.get(key)
	if (course && course.lessons){
		let questions = []
		for (const lesson of course.lessons) {
			if (lesson.questions) {
				questions = [...questions, ...lesson.questions]
			}
		}
		if (questions.length > 0) return questions
	}

	const questionsDB = await get('question')
	const lessons = await get('lesson')
	const answersDB = await get('lesson')
	if (notebookPages) {
		const questions = questionsDB
			.filter((question) => question.courseId == courseId)
			.map((question) => {
				const answers = answersDB.find((answer) => answer.questionId == question.id)
				question.answers = answers
				return question
			})

		;(async () => {
			cache.apply((key), (val) => {
				let newCourse = val
				if (!newCourse.lessons) {
					console.error(`No lessons in cache ${key}, can't cache questions.`)
					return newCourse
				}
				for (let lesson of newCourse.lessons) {
					lesson.questions = questions.filter((question) => question.lessonId == lesson.id)
				}
				return newCourse
			})
		})()

		return pages
	}
}
