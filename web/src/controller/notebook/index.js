import { updatePage as updatePageCache } from './cache'
import { updatePage as updatePageDB } from './database'
import { updatePage as updatePageAPI } from './api'

export const updatePage = (client, userId, courseId, input) => {
	// 	input: id, content, words, lessonId
	updatePageCache(courseId, input)
	updatePageDB(input)
	updatePageAPI(client, userId, input)
}
