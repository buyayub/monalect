import {get, getMany, setMany} from 'idb-keyval'

export const deleteCourse = async (courseId) => {
	const [
		answer,
		article,
		articleOnLesson,
		course,
		lesson,
		notebookPage,
		question,
		section,
		sectionOnLesson,
		test,
		testOnLesson,
		textbook,
	] = await getMany([
		'answer',
		'article',
		'articleOnLesson',
		'course',
		'lesson',
		'notebookPage',
		'question',
		'section',
		'sectionOnLesson',
		'test',
		'testOnLesson',
		'textbook',
	])

	let db = {}

	// easy stuff first

	db.course = course.filter((item) => item.id != courseId)
	db.article = article.filter((item) => item.courseId != courseId)
	db.lesson = lesson.filter((item) => item.courseId != courseId)
	db.notebookPage = notebookPage.filter((item) => item.courseId != courseId)
	db.question = question.filter((item) => item.courseId != courseId)
	db.test = test.filter((item) => item.courseId != courseId)
	db.textbook = textbook.filter((item) => item.courseId != courseId)

	// now the hard stuff (answer, XOnX)

	let del = {}
	// we get a list of ids
	del.question = question
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)
	del.lesson = lesson
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)
	del.textbook = textbook
		.filter((item) => item.courseId == courseId)
		.map((item) => item.id)

	// use the list of ids to filter
	db.answer = answer.filter((item) => !del.question.includes(item.questionId))
	db.section = answer.filter((item) => !del.textbook.includes(item.textbookId))
	db.sectionOnLesson = sectionOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)
	db.articleOnLesson = articleOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)
	db.testOnLesson = testOnLesson.filter(
		(item) => !del.lesson.includes(item.lessonId)
	)

	const keys = Object.keys(db)
	const values = Object.values(db)
	let elements = []
	for (let i = 0; i < keys.length; i++) elements.push([keys[i], values[i]])

	await setMany(elements)

	console.debug(`course ${courseId} deleted from idb`)

	// never do your own cascades
}
