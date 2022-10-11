import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'
import { s3Client } from 'src/lib/aws'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// get presigned key for client textbook access
const getPresigned = async (url) => {
	const crypto = require('crypto')
	const bucketParams = {
		Bucket: 'monalectpdf',
		Key: url + '.pdf',
		ContentType: 'application/pdf',
	}

	const command = new GetObjectCommand(bucketParams)
	const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 43200 })

	return signedUrl
}

export const allPresigned = async ({ userId, courseId }) => {
	isOwner(userId)

	let textbooks = await db.textbook.findMany({
		where: {
			userId: userId,
			courseId: courseId,
			uploaded: true,
		},
		select: {
			id: true,
			url: true,
			title: true,
		},
	})

	let articles = await db.article.findMany({
		where: {
			userId: userId,
			courseId: courseId,
			uploaded: true,
		},
		select: {
			id: true,
			url: true,
			title: true,
		},
	})

	let payload = [...textbooks, ...articles]

	for (let item of payload) {
		const presigned = await getPresigned(item.url)
		item.presigned = presigned
	}

	return payload
}

export const allTextbooks = async ({ userId }) => {
	isOwner(userId)
	const textbooks = await db.textbook.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			courseId: true,
			title: true,
			author: true,
			pages: true,
			pageOffset: true,
			isbn: true,
			url: true,
		},
	})

	return textbooks
}

export const presigned = async({ userId, id}) => {
	isOwner(userId)
	let material = await db.textbook.findMany({
		where: {
			userId: userId,
			id: id
		},
		select: {
			url: true,
			title: true
		}})

	if (!material){
		material = await db.article.findMany({
		where: {
			userId: userId,
			id: id
		},
		select: {
			url: true,
			title: true
		}})
	}


	if (!material) return []

	const presignedUrl = getPresigned(material[0].url)
	return { 
		id: id,
		url: material[0].url,
		presigned: presignedUrl,
		title: material[0].title
	}
}
