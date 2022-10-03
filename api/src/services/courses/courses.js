import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'
import { s3Client } from 'src/lib/aws'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'

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
			description: true,
		},
	})

	for (let courseCard of courseCards) {
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
		// if there are actually any lesson averages, find the average of them all
		if (lessonAverages.length != 0) {
			const sum = lessonAverages.reduce((a, b) => a + b)
			courseCard.mark = Math.floor(sum / lessonAverages.length)
		}

		courseCard.lessonCount = lessons.length
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
			description: true,
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
	// if there are actually any lesson averages, find the average of them all
	if (lessonAverages.length != 0) {
		const sum = lessonAverages.reduce((a, b) => a + b)
		courseCard.mark = Math.floor(sum / lessonAverages.length)
	}

	courseCard.lessonCount = lessons.length

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
			description: true,
			createdAt: true,
			active: true
		},
	})

	return courses
}

export const updateCourse = async ({ userId, id, input }) => {
	isOwner(userId)

	const course = await db.course.findUnique({
		where: {
			id: id,
		}})

	isOwner(course.userId)

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
	isOwner(userId) //check if user is the same

	const courseAuth = await db.course.findUnique({
		where: {
			id: id,
		},
		select: {
			userId: true,
		},
	})

	isOwner(courseAuth.userId) // check if the selected item is the user's

	const textbooks = await db.textbook.findMany({
		where: {
			courseId: id,
		},
		select: {
			url: true,
		},
	})

	// delete textbook files
	for (textbook of textbooks) {
		if (textbook.url) {
			const data = await s3Client.send(
				new DeleteObjectCommand({
					Bucket: 'monalectpdf',
					Key: textbook.url + '.pdf',
					ContentType: 'application/pdf',
				})
			)
		}
	}


	const course = await db.course.delete({
		where: {
			id: id,
		},
	})
	return true
}
