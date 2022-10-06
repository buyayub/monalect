import { get, getMany, setMany, update } from 'idb-keyval'
import { cache } from 'src/shared/cache'
import { useApolloClient } from '@apollo/client'

// I'm going to make my life easier and not interact much with batch creation until I go deeper into the design
// so for now, all this does is update the caches in one function, and update the ids in another

export const createBatch = async (course) => {
	createBatchWeb(course)
}

export const createBatchWeb = async (course) => {
	cache.push('course-dropdown', {
		value: course.localId,
		title: course.title ? course.title : 'Untitiled',
	})

	cache.create(`${course.localId}-stats`, {
		words: 0,
		lessons: course.lesson.length,
	})

	cache.create(`course-${course.localId}`, {
		id: course.localId,
		title: course.title,
		lessons: course.lessons.map((lesson, i) => {
			const links = course.link.filter(
				(link) => link.lessionId === lesson.localId
			)
			const sections = links.map((link) => {
				return course.section.find(
					(section) => section.localId == link.materialId
				)
			})
			const articles = links.map((link) => {
				return course.article.find(
					(article) => article.localId == link.materialId
				)
			})

			return {
				id: lesson.localId,
				index: i,
				title: lesson.title,
				questionCount: 0,
				lessonCount: 0,
				sections: sections.map((section) => {
					return {
						title: section.title,
						start: section.start,
						end: section.end,
					}
				}),
				articles: articles.map((article) => {
					return { title: article.title, pages: article.pages }
				}),
			}
		}),
	})
}

export const createBatchDB = async (course) => {}

export const createBatchAPI = async (course) => {}

