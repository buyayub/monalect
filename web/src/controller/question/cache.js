import { cache } from 'src/lib/cache'
import { db } from 'src/lib/db'

export const createQuestion = async (courseId, input) => {
	const key = `course-${courseId}`

	let answers = input.answers.map((answer) => {
		return {
			id: answer.id,
			answer: answer.answer,
			correct: answer.correct,
		}
	})

	cache.apply(key, (item) => {
		let course = item
		const lesson = course.lessons.find((item) => item.id == input.lessonId)

		if (!lesson.questions) lesson.questions = [] // create if none there
		lesson.questions.push({
			id: input.localId, // it'll be a temp until it's replaced
			question: input.question,
			multiple: input.multiple,
			choices: input.choices,
			answers: answers,
		})
		return course
	})

	updateQuestionCount(courseId, input.lessonId)
}

export const updateQuestionCount = async (courseId, lessonId, count) => {
	cache.apply(`course-${courseId}`, (item) => {
		let course = item
		let lesson = course.lessons.find((item) => item.id == lessonId)

		let length = 0
		for (let item of course.lessons) {
			if (item.questions) length += item.questions.length
		}

		if (!lesson.questions) lesson.questions = []

		course.questionCount = length
		lesson.questionCount = lesson.questions.length

		cache.apply(`course-cards`, (cards) => {
			let cardCourse = cards.find((card) => card.id == courseId)
			cardCourse.questionCount = length
			return cards
		})

		return course
	})
}

export const updateQuestions = async (courseId) => {
	const key = `course-${courseId}`
	const allQuestions = await db.get('question')
	const allAnswers = await db.get('answer')

	const questions = allQuestions.filter(
		(question) => question.courseId == courseId
	)

	cache.apply(key, (val) => {
		let course = val
		let lessons = course.lessons
		if (lessons) {
			for (let lesson of lessons) {
				lesson.questions = questions
					.filter((question) => question.lessonId == lesson.id)
					.map((question) => {
						const answers = allAnswers.filter((answer) => {
							return answer.questionId == question.id
						})
						console.log(answers)
						return {
							...question,
							answers: answers,
						}
					})
			}
		}
		return course
	})
}

export const deleteQuestion = async (courseId, questionId) => {
	let lessonCourse = cache.get(`course-${courseId}`)
	let newLesson = lessonCourse.lessons.find((lesson) => {
		if (lesson.questions) {
			let newQuestion = lesson.questions.find(
				(question) => question.id == questionId
			)
			console.log(newQuestion)
			return newQuestion
		}
	})

	cache.apply(`course-${courseId}`, (course) => {
		let lessons = course.lessons
		if (lessons) {
			for (let lesson of lessons) {
				if (lesson.questions)
					lesson.questions = lesson.questions.filter(
						(question) => question.id !== questionId
					)
			}
		}
		return course
	})

	updateQuestionCount(courseId, newLesson.id)
}
