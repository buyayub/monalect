import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from 'src/lib/aws'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fetch } from 'node-fetch'

const getPresigned = async () => {
	const crypto = require('crypto')
	const url = crypto.randomBytes(12).toString('hex')

	const bucketParams = {
		Bucket: 'monalectpdf',
		Key: url + '.pdf',
		ContentType: 'application/pdf',
	}

	const command = new PutObjectCommand(bucketParams)
	const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

	console.log(signedUrl)

	return [url, signedUrl]
}

export const createBatchCourse = async ({ userId, input }) => {
	let record = []
	let payload = {
		uploaded: [],
		ids: [],
	}

	isOwner(userId) // this is basically just auth, i'm paranoid

	const course = await db.course.create({
		data: {
			userId: userId,
			title: input.title,
			description: input.description,
		},
	})

	record.push({ local: input.localId, real: course.id })

	for (material of input.material) {
		if (material.type == 'textbook') {
			const textbook = await db.textbook.create({
				data: {
					userId: userId,
					courseId: course.id,
					title: material.title,
					isbn: material.identifier,
					uploaded: material.uploaded,
					pages: material.pages,
					author: material.author,
				},
			})

			// if the user wants this uploaded, we'll update textbook with the url or key, and then add the presigned URL to the payload for them to upload
			if (material.uploaded) {
				const [url, signedUrl] = await getPresigned()
				await db.textbook.update({
					where: {
						id: textbook.id,
					},
					data: {
						url: url,
					},
				})

				payload.uploaded.push({
					type: 'textbook',
					materialId: textbook.id,
					presigned: signedUrl,
					url: url

				})
			}

			record.push({ local: material.localId, real: textbook.id })
		} else if (material.type == 'article') {
			const article = await db.article.create({
				data: {
					userId: userId,
					courseId: course.id,
					title: material.title,
					doi: material.identifier,
					uploaded: material.uploaded,
					pages: material.pages,
					author: material.author,
				},
			})

			if (material.uploaded) {
				const [url, signedUrl] = await getPresigned()
				await db.article.update({
					where: {
						id: article.id,
					},
					data: {
						url: url,
					},
				})

				payload.uploaded.push({
					type: 'article',
					materialId: article.id,
					presigned: signedUrl,
				})
			}

			record.push({ local: material.localId, real: article.id })
		}
	}

	// Create lessons, notebookPages, and sections

	for (lesson of input.lesson) {
		let newLesson = await db.lesson.create({
			data: {
				userId: userId,
				courseId: course.id,
				index: lesson.index,
				title: lesson.title,
			},
		})

		record.push({ local: lesson.localId, real: newLesson.id })
	}

	for (page of input.page) {
		const newPage = await db.notebookPage.create({
			data: {
				page: 0,
				words: 0,
				lessonId: record.find((item) => item.local == page.lessonId).real,
				courseId: course.id,
				userId: userId,
			},
		})
		record.push({ local: page.localId, real: page.id })
	}

	for (section of input.section) {
		const newSection = await db.textbookSection.create({
			data: {
				userId: userId,
				title: section.title,
				start: section.start,
				end: section.end,
				textbookId: record.find((item) => item.local == section.textbookId),
			},
		})
		record.push({ local: section.localId, real: section.id })
	}

	// Create many-to-many relations

	for (link of input.links) {
		if (link.type == 'article') {
			const newLink = await db.articleOnLesson.create({
				data: {
					lessonId: record.find((item) => item.local == link.lessonId),
					articleId: article.find((item) => item.local == link.materialId),
				},
			})

			record.push({ local: link.localId, real: newLink.id })
		} else if (link.type == 'section') {
			const newLink = await db.articleOnLesson.create({
				data: {
					lessonId: record.find((item) => item.local == link.lessonId),
					textbookId: article.find((item) => item.local == link.materialId),
				},
			})
			record.push({ local: link.localId, real: newLink.id })
		}
	}

	payload.record = record
	return payload
}

export const all = async ({ userId }) => {
	isOwner(userId)

	const course = await db.course.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			title: true,
			description: true,
			createdAt: true,
			active: true,
		},
	})

	const lesson = await db.lesson.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			title: true,
			index: true,
		},
	})

	const textbook = await db.textbook.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			title: true,
			author: true,
			pages: true,
			uploaded: true,
			pageOffset: true,
			isbn: true,
			url: true,
		},
	})

	const section = await db.textbookSection.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			title: true,
			start: true,
			end: true,
			textbookId: true,
		},
	})

	const article = await db.article.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			title: true,
			author: true,
			pages: true,
			uploaded: true,
			pageOffset: true,
			doi: true,
			url: true,
		},
	})

	const question = await db.question.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			lessonId: true,
			courseId: true,
			question: true,
			multiple: true,
			choices: true,
		},
	})

	const answer = await db.answer.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			answer: true,
			correct: true,
			questionId: true,
		},
	})

	const test = await db.test.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			correct: true,
			count: true,
			quiz: true,
		},
	})

	const notebookPage = await db.notebookPage.findMany({
		where: {
			userId: userId,
		},
	})

	const sectionOnLesson = await db.sectionOnLesson.findMany({
		where: {
			lesson: {
				userId: {
					equals: userId,
				},
			},
			section: {
				userId: {
					equals: userId,
				},
			},
		},
	})

	const articleOnLesson = await db.articleOnLesson.findMany({
		where: {
			lesson: {
				userId: {
					equals: userId,
				},
			},
			article: {
				userId: {
					equals: userId,
				},
			},
		},
	})
	const testOnLesson = await db.testOnLesson.findMany({
		where: {
			lesson: {
				userId: {
					equals: userId,
				},
			},
			test: {
				userId: {
					equals: userId,
				},
			},
		},
	})

	const all = {
		course: course,
		lesson: lesson,
		textbook: textbook,
		section: section,
		article: article,
		question: question,
		answer: answer,
		test: test,
		notebookPage: notebookPage,
		sectionOnLesson: sectionOnLesson,
		articleOnLesson: articleOnLesson,
		testOnLesson: testOnLesson,
	}

	return all
}
