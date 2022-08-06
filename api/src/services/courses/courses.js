import { db } from 'src/lib/db'

export const courses = () => {
	return db.course.findMany()
}

export const course = ({ id }) => {
	return db.course.findUnique({
		where: { id },
	})
}

export const cards = async ({ userId }) => {
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
		const notebookWords = await db.notebookPage.aggregate({
			_sum : {
				words: true
			},
			where: {
				courseId: card.id
			}
		})

		const questionCount = await db.question.count({
			where: {
				courseId: card.id
			}
		})

		courseCard.notebookWords = notebookWords.words;
		courseCard.questionCount = questionCount;
	}
	return courseCards;
}

export const card = async ({courseId}) => {
	let courseCard = await db.course.findUnique({
		where: {
			id: courseId
		},
		select: {
			id: true,
			title: true,
			mark: true
	}})

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

export const createCourse = ({ input }) => {
	return db.course.create({
		data: input,
	})
}

export const updateCourse = ({ id, input }) => {
	return db.course.update({
		data: input,
		where: { id },
	})
}

export const deleteCourse = ({ id }) => {
	return db.course.delete({
		where: { id },
	})
}

export const Course = {
	user: (_obj, { root }) =>
		db.course.findUnique({ where: { id: root.id } }).user(),
	lessons: (_obj, { root }) =>
		db.course.findUnique({ where: { id: root.id } }).lessons(),
	textbooks: (_obj, { root }) =>
		db.course.findUnique({ where: { id: root.id } }).textbooks(),
	articles: (_obj, { root }) =>
		db.course.findUnique({ where: { id: root.id } }).articles(),
	goals: (_obj, { root }) =>
		db.course.findUnique({ where: { id: root.id } }).goals(),
}
