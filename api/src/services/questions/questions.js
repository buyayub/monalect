import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const questionsByLesson = async ({userId, courseId}) => {
	isOwner(userId)

	let payload = await db.lesson.findMany({
		where: 
		{
			userId: userId,
			courseId: courseId
		},
		select: 
		{
			id: true,
			index: true,
			title: true
		}})

	for (item of payload){ 
		item.questions = db.question.findMany({
			where: {
				lessonId: item.id 
			},
			select: {
				id: true,
				question: true,
				multiple: true,
				answers: true
			}
		})
	}

	// add unsorted questions. these shouldn't exist, but they will w/ imports
	payload.push({
		id: null,
		index: null,
		title: null,
		questions: (await db.question.findMany({
			where: {
				courseId: courseId,
				lessonId: null
			},
			select: {
				id: true,
				question: true,
				multiple: true,
				answers: true
			}
		}))
	})

	return payload

}

export const createQuestion = async ( { userId, input } ) => {
	isOwner(userId)

	const question = await db.question.create({
		data: {
			userId: userId,
			courseId: input.courseId,
			lessonId: input.lessonId,
			question: input.question,
			choices: input.choices,
			multiple: input.multiple
		},
		select: {
			id: true,
			lessonId: true,
			question: true,
			multiple: true,
			choices: true
		}
	})

	return question
}
