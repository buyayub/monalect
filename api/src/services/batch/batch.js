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
		Key: url + ".pdf",
		ContentType: 'application/pdf'
	}

	const command = new PutObjectCommand(bucketParams)
	const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

	console.log(signedUrl)

	return [url, signedUrl]
}

export const createBatchCourse = async ({ input }) => {
	let record = []
	let payload = []

	isOwner(input.userId) // this is basically just auth, i'm paranoid

	const course = await db.course.create({
		data: {
			userId: input.userId,
			title: input.title,
		},
	})

	for (material of input.material) {
		if (material.type == 'textbook') {
			const textbook = await db.textbook.create({
				data: {
					userId: input.userId,
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

				payload.push({
					materialId: textbook.id,
					localId: material.localId,
					presigned: signedUrl
				})
			}

			record.push([material.localId, textbook.id])

			//create textbook sections

			for (section of material.sections) {
				const textbookSection = await db.textbookSection.create({
					data: {
						userId: input.userId,
						textbookId: textbook.id,
						title: section.title,
						start: section.start,
						end: section.end,
					},
				})
				record.push([section.localId, textbookSection.id])
			}
		} else if (material.type == 'article') {
			const article = await db.article.create({
				data: {
					userId: input.userId,
					courseId: course.id,
					title: material.title,
					doi: material.identifier,
					uploaded: false,
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

				payload.push({
					materialId: article.id,
					localId: material.localId,
					presigned: signedUrl
				})
			}

			record.push([material.localId, article.id])
		}
	}

	// Create lessons and notebookPages

	for (lesson of input.lesson) {
		let newLesson = await db.lesson.create({
			data: {
				userId: input.userId,
				courseId: course.id,
				index: lesson.index,
				title: lesson.title,
			},
		})

		await db.notebookPage.create({
			data: {
				page: 0,
				words: 0,
				lessonId: newLesson.id,
				courseId: course.id,
				userId: input.userId,
			},
		})

		record.push([lesson.localId, newLesson.id])
	}

	// Create many-to-many relations
	// We first check the type of the relation, if it's an article, we create an ArticleOnLesson object, otherwise SectionOnLesson
	// Lots of for loops to optimize later

	const findType = (material, localId) => {
		for (const material of input.material) {
			if (localId == material.localId) {
				return material.type
			}

			for (const section of material.sections) {
				if (localId == section.localId) {
					return 'section'
				}
			}
		}
	}

	const findRealId = (localId) => {
		for (const entry of record) {
			if (localId == entry[0]) {
				return entry[1]
			}
		}
		return null
	}

	for (lesson of input.lesson) {
		for (link of lesson.material) {
			// search through material for local id
			let linkType = findType(input.material, link)
			if (linkType == 'article') {
				let articleId = findRealId(link)
				let lessonId = findRealId(lesson.localId)
				await db.articleOnLesson.create({
					data: {
						lessonId: lessonId,
						articleId: articleId,
					},
				})
			} else if (linkType == 'section') {
				let sectionId = findRealId(link)
				let lessonId = findRealId(lesson.localId)
				await db.sectionOnLesson.create({
					data: {
						lessonId: lessonId,
						sectionId: sectionId,
					},
				})
			}
		}
	}

	return payload
}
