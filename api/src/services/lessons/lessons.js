import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const lessons = async ({ courseId, userId }) => {
	isOwner(userId)

	const courseAuth = await db.course.findUnique({
		where: {
			id: courseId
		}})
	
	isOwner(courseAuth.userId)

	let payload = await db.lesson.findMany({
		where: {
			courseId: courseId,
			userId: userId,
		},
	})

	// Add linked lessons and sections
	for (item of payload) {
		item.notebookWords = (
			await db.notebookPage.findFirst({
				where: {
					lessonId: item.id,
				},
			})
		).words

		item.questionCount = await db.question.count({
			where: {
				lessonId: item.id,
			},
		})

		item.articles = await db.article.findMany({
			where: {
				lessons: {
					some: {
						lessonId: item.id,
					},
				},
			},
		})

		item.sections = await db.textbookSection.findMany({
			where: {
				lessons: {
					some: {
						lessonId: item.id,
					},
				},
			},
		})

		// get the latest test
		let lessonTest = await db.testOnLesson.findMany({
			where: {
				lessonId: item.id,
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

		if (lessonTest[0]) {
			item.mark = Math.floor((lessonTest[0].correct / lessonTest[0].count) * 100)
		}
	}
	return payload
}

export const allLessons = async ({userId}) => {
	isOwner(userId)

	const lessons = await db.lesson.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			title: true,
			index: true,
		}
	})
	return lessons
}
