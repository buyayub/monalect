import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const cards = async ({ userId }) => {
	isOwner(userId)

	let courseCards = await db.course.findMany({
		where: {
			userId: userId
		},
		select: {
			id: true,
			title: true,
			mark: true
	}})

	for (const courseCard of courseCards) {
		const notebookWords = (await db.notebookPage.aggregate({
			_sum : {
				words: true
			},
			where: {
				courseId: courseCard.id
			}
		}))._sum.words

		const questionCount = await db.question.count({
			where: {
				courseId: courseCard.id
			}
		})

		courseCard.notebookWords = notebookWords;
		courseCard.questionCount = questionCount;
	}
	return courseCards;
}

export const card = async ({courseId}) => {
	let courseCard = await db.course.findUnique({
		where: {
			id: courseId,
		},
		select: {
			id: true,
			userId: true,
			title: true,
			mark: true
	}})

	isOwner(courseCard.userId)

	courseCard.notebookWords = (await db.notebookPage.aggregate({
			_sum : {
				words: true
			},
			where: {
				courseId: card.id
		}
	})).words

		courseCard.questionCount = await db.question.count({
			where: {
				courseId: card.id
			}
		})

	return courseCard
}

export const courses = async ({ userId }) => {
	isOwner(userId)

	let courses = await db.course.findMany({
		where: {
			userId: userId
		},
		select: {
			id: true,
			title: true,
	}})

	return courses;
}
