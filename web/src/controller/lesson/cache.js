import { db } from 'src/shared/db'
import { cache } from 'src/shared/cache'
import { getLessonWordCount, getLessonQuestionCount } from 'src/models/stats/db'

export const updateLesson = async (courseId) => {
	const key = `course-${courseId}`

	const allLessons = await db.get('lesson')
	const lessons = allLessons.filter((lesson) => lesson.courseId == courseId)


	cache.update(key, (course) => {
		course.lessons = [...lessons.map((lesson) => { return {
			id: lesson.id,
			index: lesson.index
		}
		})]
	})
}


