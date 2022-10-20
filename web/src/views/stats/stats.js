import { get, getMany } from 'idb-keyval'
import { cache } from 'src/shared/cache'
import {
	getCourseWords as getCourseWordsCache,
	getLessonCount as getLessonCountCache,
	getQuestionCount as getquestionCountCache
} from './cache'
import {
	getCourseWords as getCourseWordsDb,
	getLessonCount as getLessonCountDb,
	getQuestionCount as getQuestionCountDb
} from './db'

export const getCourseWords = async (courseId) => {
	// if there isn't any notebookPages entry, we message the error
	const wordsCache = getCourseWordsCache(courseId)
	if (wordsCache) return wordsCache
	const wordsDb = getCourseWordsDb(courseId)
	if (wordsDb) return wordsDb
}

export const getLessonCount = async (courseId) => {
	const countCache = getLessonCountCache(courseId)
	if (countCache) return countCache
	const countDb = getLessonCountDb(courseId)
	if (countDb) return countDb
}

export const getQuestionCount = async (courseId) => {
	const countCache = getQuestionCountCache(courseId)
	if (countCache) return countCache
	const countDb = getQuestionCountDb(courseId)
	if (countDb) return countDb
}

export const getCourseMark = async (courseId) => {
	const key = `${courseId}-stats`
}
