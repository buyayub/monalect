import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

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


export const updateNotebookPage = async ({userId, id, input}) => {
	isOwner(userId) 	
	
	page = await db.notebookPage.findUnique({where: { id: id}})

	isOwner(page.userId)

	await db.notebookPage.update({
		where: {
			id: id,
		},
		data: {
			words: input.words,
			content: input.content
		}
	})

	return true;
}
