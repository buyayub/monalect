import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const questionsByLesson = async ({ userId, courseId }) => {
	isOwner(userId)

	let payload = await db.lesson.findMany({
		where: {
			userId: userId,
			courseId: courseId,
		},
		select: {
			id: true,
			index: true,
			title: true,
		},
	})

	for (item of payload) {
		item.questions = db.question.findMany({
			where: {
				lessonId: item.id,
			},
			select: {
				id: true,
				lessonId: true,
				question: true,
				multiple: true,
				answers: true,
				choices: true,
			},
		})
	}

	// add unsorted questions. these shouldn't exist, but they will w/ imports
	payload.push({
		id: null,
		index: null,
		title: null,
		questions: await db.question.findMany({
			where: {
				courseId: courseId,
				lessonId: null,
			},
			select: {
				id: true,
				lessonId: true,
				question: true,
				multiple: true,
				answers: true,
				choices: true,
			},
		}),
	})

	return payload
}

export const createQuestion = async ({ userId, input }) => {
	isOwner(userId)

	let question = await db.question.create({
		data: {
			userId: userId,
			courseId: input.courseId,
			lessonId: input.lessonId,
			question: input.question,
			choices: input.choices,
			multiple: input.multiple,
		},
		select: {
			id: true,
			lessonId: true,
			question: true,
			multiple: true,
			choices: true,
		},
	})

	let answers = []

	if (input.answers.length > 0) {
		for (answer of input.answers) {
			answers.push(
				await db.answer.create({
					data: {
						userId: userId,
						questionId: question.id,
						correct: answer.correct,
						answer: answer.answer,
					},
					select: {
						id: true,
						questionId: true,
						correct: true,
						answer: true,
					},
				})
			)
		}
	}

	question.answers = answers

	return question
}

export const deleteQuestion = async ({ userId, questionId }) => {
	isOwner(userId)
	const question = db.question.delete({
		where: {
			id: questionId,
		},
	})
	return question
}
