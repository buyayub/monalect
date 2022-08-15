import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'
import { s3Client } from 'src/lib/aws'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const getPresigned = async ( url ) => {
	const crypto = require('crypto')
	const bucketParams = {
		Bucket: 'monalectpdf',
		Key: url + ".pdf",
		ContentType: 'application/pdf'
	}

	const command = new GetObjectCommand(bucketParams)
	const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 43200})

	return signedUrl
}

const uploaded = async({userId, courseId}) => {
	
}

export const textbooks = async ({userId, courseId}) => {
	isOwner(userId)

	let payload = await db.textbook.findMany({
		where: {
			userId: userId,
			courseId: courseId,
			uploaded: true
		},
		select: {
			id: true,
			url: true,
			title: true
		}
	})

	for (item of payload) {
		const presigned = await getPresigned(item.url)
		item.presigned = presigned
	}

	return payload
}
