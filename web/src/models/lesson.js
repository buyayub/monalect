import { get, getMany } from 'idb-keyval'
import { getLessonMark } from 'src/models/stats/db'

// for display cases, such as in overview, questions, and tests
/*

lessons: [
	lesson {
		id
		title
		notebookWords
		questionCount
		mark
		articles: [ 
			article: {
				title
			}
		]
		sections: [
			section: {
				title
				start
				end
			}
		]
	}
]
*/

// TODO: create future option w/ only lesson id available
export const getLessonQuestionCount = async (courseId, lessonId) => {
	const key = `course-${courseId}`

	let course = JSON.parse(sessionStorage.getItem(key))
	if (course && course.lessons) {
		const lesson = course.lessons.find((item) => item.id == lessonId)
		if (lesson && lesson.questionCount) return lesson.questionCount // RETURN
	}

	let questions = await get('question')
	if (questions) {
		let count = 0
		for (const question of questions)
			count += question.lessonId == lessonId

		;(async () => {
			if (course && course.lessons) {
				let courseCopy = course;
				const index = courseCopy.lessons.indexOf((lesson) => lesson.id == lessonId);

				courseCopy.lessons[index] = {...courseCopy.lessons[index], questionCount: count}
				
				localStorage.setItem(key, JSON.stringify(courseCopy))
				sessionStorage.setItem(key, JSON.stringify(courseCopy))
			}
			else if (course && !course.lessons)  {
				localStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, questionCount: count}]}))
				sessionStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, questionCount: count}]}))
			}
			else {
				localStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, questionCount: count}]}))
				sessionStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, questionCount: count}]}))
			}
		})();
		return count;
	}
}

// TODO: create a batch function instead of an individual one
export const getLessonWordCount = async (courseId, lessonId) => {
	const key = `course-${courseId}`

	let course = JSON.parse(sessionStorage.getItem(key))
	if (course && course.lessons) {
		const lesson = course.lessons.find((item) => item.id == lessonId)
		if (lesson && lesson.words) return lesson.words // RETURN 
	}

	let pages = await get('notebookPage');
	if (pages) {
		const page = pages.find((page) => page.lessonId == lessonId);
		if (!page) console.warn(`Lesson ${lessonId} does not have a corresponding notebook page in client database.`)

		let count = page ? page.words : 0

		;(async () => {
			if (course && course.lessons) {
				let courseCopy = course;
				const index = courseCopy.lessons.indexOf((lesson) => lesson.id == lessonId);

				courseCopy.lessons[index] = {...courseCopy.lessons[index], words: count}
				
				localStorage.setItem(key, JSON.stringify(courseCopy))
				sessionStorage.setItem(key, JSON.stringify(courseCopy))
			}
			else if (course && !course.lessons)  {
				localStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, words: count}]}))
				sessionStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, words: count}]}))
			}
			else {
				localStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, words: count}]}))
				sessionStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, words: count}]}))
			}
		})();

		return count
	}
}

export const getLessonSections = async (courseId, lessonId) => {
	const key = `course-${courseId}`
	
	let course = JSON.parse(sessionStorage.getItem(key))
	if (course && course.lessons) {
		const lesson = course.lessons.find((item) => item.id == lessonId)
		if (lesson && lesson.sections) return lesson.sections // RETURN 
	}

	let [sections, sectionOnLesson] = await getMany(['section', 'sectionOnLesson']);
	if (sections) {
		let payload = []
		const links = sectionOnLesson.filter((link) => link.lessonId == lessonId)
		for (const link of links) {
			const section = sections.find((section) => section.id == link.sectionId)
			if (section) {
				payload.push({
					title: section.title,
					start: section.start,
					end: section.end
				})
			}
		}

		// when multiple pages for a single lesson becomes supported, use this:
		// for (page of pages) count += page.words * (page.lessonId * lessonId);

		;(async () => {
			if (course && course.lessons) {
				let courseCopy = course;
				const index = courseCopy.lessons.indexOf((lesson) => lesson.id == lessonId);

				courseCopy.lessons[index] = {...courseCopy.lessons[index], sections: payload}
				
				localStorage.setItem(key, JSON.stringify(courseCopy))
				sessionStorage.setItem(key, JSON.stringify(courseCopy))
			}
			else if (course && !course.lessons)  {
				localStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, sections: payload}]}))
				sessionStorage.setItem(key, JSON.stringify({...course, lessons: [{id: lessonId, sections: payload}]}))
			}
			else {
				localStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, sections: payload}]}))
				sessionStorage.setItem(key, JSON.stringify({id: courseId, lessons: [{id: lessonId, sections: payload}]}))
			}
		})();

		return payload
	}
}

export const getLessonList = async (courseId) => {
	const key = `course-${courseId}`
	
	let course = JSON.parse(sessionStorage.getItem(key))
	if (course && course.lessons) {
		return course.lessons
	}

	course = JSON.parse(localStorage.getItem(key))
	if (course && course.lessons) {
		return course.lessons
	}

	const lessonData = await get('lesson')
	if (lessonData) {
		let lessons = lessonData.filter((lesson) => lesson.courseId == courseId)
		let payload = []
		for (const lesson of lessons) {
			const words = await getLessonWordCount(courseId, lesson.id)
			const questions = await getLessonQuestionCount(courseId, lesson.id)
			const sections= await getLessonSections(courseId, lesson.id)
			const mark = await getLessonMark(lesson.id)

			payload.push({
				id: lesson.id,
				index: lesson.index,
				title: lesson.title,
				questionCount: questions,
				words: words,
				sections: sections,
				articles: [],
				mark: mark
			})
		}

		;(async () => {
			if (course) {
				sessionStorage.setItem(key, JSON.stringify({...course, lessons: payload}))
				localStorage.setItem(key, JSON.stringify({...course, lessons: payload}))
			}
			else {
				sessionStorage.setItem(key, JSON.stringify({id: courseId, lessons: payload}))
				localStorage.setItem(key, JSON.stringify({id: courseId, lessons: payload}))
			}
		})();

		return payload
	}
}
