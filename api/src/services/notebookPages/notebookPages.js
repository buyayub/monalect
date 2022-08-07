import { db } from 'src/lib/db'

export const notebookPages = async ({ userId, courseId }) => {
	isOwner(userId)
	const pages = await db.notebookPage.findMany({
		where: {
			userId: userId,
			courseId: courseId,
		}
	})

	const lessons = await db.lesson.findMany({
		where: {
			userId: userId,
			courseId: courseId
		}
	})

	let payload = [];


	for (page of pages) {
		isOwner(page.userId)

		let item = {}
		item.id = page.id
		item.content = page.content

		let lesson = lessons.find((obj) => obj.id == page.lessonId)

		item.index = lesson.index
		item.lessonTitle = lesson.title

		payload.push(item)
		
	}

	return payload
}

