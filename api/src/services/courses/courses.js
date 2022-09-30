import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const cards = async ({ userId }) => {
	isOwner(userId)

	let courseCards = await db.course.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			title: true,
			mark: true,
		},
	})

	for (const courseCard of courseCards) {
		const notebookWords = (
			await db.notebookPage.aggregate({
				_sum: {
					words: true,
				},
				where: {
					courseId: courseCard.id,
				},
			})
		)._sum.words

		const questionCount = await db.question.count({
			where: {
				courseId: courseCard.id,
			},
		})

		courseCard.notebookWords = notebookWords
		courseCard.questionCount = questionCount

		// get course mark
		let lessons = await db.lesson.findMany({
			where: {
				courseId: courseCard.id,
			},
		})

		let tests = []
		// find latest marks for each lesson
		for (lesson of lessons) {
			tests.push(
				await db.testOnLesson.findMany({
					where: {
						lessonId: lesson.id,
					},
					select: {
						correct: true,
						count: true,
					},
					orderBy: {
						date: 'desc',
					},
					take: 1,
				})
			)
		}

		// get averages of each lesson
		let lessonAverages = []
		tests.forEach((test) => {
			if (test.length != 0) {
				lessonAverages.push((test[0].correct / test[0].count) * 100)
			} else {
				lessonAverages.push(0)
			}
		})

		// get sum of all lessons
		const sum = lessonAverages.reduce((a, b) => a + b)

		// if there are actually any lesson averages, find the average of them all
		if (lessonAverages.length != 0) {
			courseCard.mark = Math.floor(sum / lessonAverages.length)
		}
	}
	return courseCards
}

export const card = async ({ courseId }) => {
	let courseCard = await db.course.findUnique({
		where: {
			id: courseId,
		},
		select: {
			id: true,
			userId: true,
			title: true,
			mark: true,
		},
	})

	isOwner(courseCard.userId)

	courseCard.notebookWords = (
		await db.notebookPage.aggregate({
			_sum: {
				words: true,
			},
			where: {
				courseId: card.id,
			},
		})
	).words

	courseCard.questionCount = await db.question.count({
		where: {
			courseId: card.id,
		},
	})

	// get course mark
	let lessons = await db.lesson.findMany({
		where: {
			courseId: courseId,
		},
	})

	let tests = []
	// find latest marks for each lesson
	for (lesson of lessons) {
		tests.push(
			await db.testOnLesson.findMany({
				where: {
					lessonId: lesson.id,
				},
				select: {
					correct: true,
					count: true,
				},
				orderBy: {
					date: 'desc',
				},
				take: 1,
			})
		)
	}

	// get averages of each lesson
	let lessonAverages = []
	tests.forEach((test) => {
		if (test.length != 0) {
			lessonAverages.push((test[0].correct / test[0].count) * 100)
		} else {
			lessonAverages.push(0)
		}
	})

	// get sum of all lessons
	const sum = lessonAverages.reduce((a, b) => a + b)

	// if there are actually any lesson averages, find the average of them all
	if (lessonAverages.length != 0) {
		courseCard.mark = Math.floor(sum / lessonAverages.length)
	}

	return courseCard
}

export const courses = async ({ userId }) => {
	isOwner(userId)

	let courses = await db.course.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			title: true,
		},
	})

	return courses
}

export const updateCourse = async ({ userId, id, input }) => {
	isOwner(userId)

	const update = await db.course.update({
		where: {
			id: id,
		},
		data: {
			title: input.title != null ? input.title : undefined,
			description: input.description != null ? input.description : undefined,
		},
	})

	return update
}

export const deleteCourse = async ({ userId, id }) => {
	const courseUser = await db.course.findMany({
		where: {
			id: id,
		},
		select: {
			userId: true,
		},
	})

	isOwner(courseUser[0].userId)

	const course = await db.course.delete({
		where: {
			id: id,
		},
	})

	return true
}
