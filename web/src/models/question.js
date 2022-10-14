import { cache } from 'src/shared/cache'
import { get } from 'idb-keyval'
import { updateQuestions as updateQuestionsCache  } from 'src/controller/question/cache'

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

		return questions
	}
}

export const getQuestionLessons = async (courseId) => {
	const key = `course-${courseId}`
	const course = cache.get(key)
	if (course && course.lessons) {
		let lessons = [...course.lessons]

		// check if any lesson questions are undefined.
		let update = lessons.find((lesson) => lesson.questions == undefined)

		if (!update) {
			lessons = lessons.map((lesson) => {return {
					id: lesson.id,
					title: lesson.title, 
					index: lesson.index,
					questions: lesson.questions}})
			return lessons
		} 
		else if (update) {
			// if so, then we have to update the thing first, and redo this 
			await updateQuestionsCache(courseId)
			const list = await getQuestionLessons(courseId)
			return list
		}
	}
}
