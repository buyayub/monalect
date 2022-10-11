import { cache } from 'src/shared/cache'
import { GET_PRESIGNED, GET_ALL_PRESIGNED } from 'src/shared/queries/material'

export const getMaterialFiles = async (client, userId, courseId) => {
	const key = `course-${courseId}`

	let course = cache.get(key)
	if (course && course.files) return course.files

	// We're going to get the presigned urls directly from the API, this model has no interaction with the database
	const files = await getAllPresigned(client, userId, courseId)
	console.log({files})
	if (files) {
		;(async () => {
			cache.updateProp(key, 'files', files)
		})()
		return files
	}

	console.warn("Couldn't get any presigned urls.")
	return null
}

export const updatePresigned = async (client, userId, courseId, id) => {
	const data = await getPresigned(client, userId, id)
	const key = `course-${courseId}`

	console.log(data)
	cache.apply(key, (val) => {
		let course = val
		if (course.files) {
			let newFile = course.files.find((file) => file.id == id)
			let expiry = new Date(Date.now() + 720 * 60000)
			console.log("new", expiry)
			console.log("now", Date.now())
			newFile.expiryDate = expiry.toISOString()
			newFile.presigned = data.presigned
		}
		return course
	})

	return data
}

export const isPresignedValid = (file) => {
	if (!file.presigned) return false

	const expiry = new Date(file.expiryDate)
	if (Date.now() < expiry) return true
	else return false
}

export const getPresigned = async (client, userId, id) => {
	console.info("Sent query for presigned.")
	const response = await client.query({
		query: GET_PRESIGNED,
		variables: {
			userId: userId,
			id: id,
		},
	})

	return response.data.presigned
}

export const getAllPresigned = async (client, userId, courseId) => {
	console.info("Sent query for all presigned.")
	const response = await client.query({
		query: GET_ALL_PRESIGNED,
		variables: {
			userId: userId,
			courseId: courseId,
		},
	})
	return response.data.allPresigned
}
