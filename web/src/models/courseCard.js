import { get, getMany } from 'idb-keyval'
import { getCourseWords, getQuestionCount, getLessonCount} from './stats'
import { getCourseMark } from './stats/db'

// primarily for the home page
/*

cards: [
	card {
		id (course)	
		title
		description
		notebookWords
		questionCount
		lessonCount
		mark
	}
]
	

 */


export const getCourseCards = async () => {
	const key = 'course-cards'
	// check sessionStorage
	const sessionCards = JSON.parse(sessionStorage.getItem(key))
	if (sessionCards) {
		return sessionCards
	}

	// check localStorage, and update sessionStorage
	const localCards = JSON.parse(localStorage.getItem(key))
	if (localCards) {
		sessionStorage.setItem('course-cards', JSON.stringify(localCards))
		return localCards
	}

	// create cards from indexedDB
	const courses = await get('course')
	if (courses) {
		let cards = []
		for (const course of courses) {
			const notebookWords = await getCourseWords(course.id)
			const lessonCount = await getLessonCount(course.id)
			const questionCount = await getQuestionCount(course.id)
			const mark = await getCourseMark(course.id)

			cards.push({
				id: course.id,
				title: course.title,
				description: course.description,
				notebookWords: notebookWords,
				questionCount: questionCount,
				lessonCount: lessonCount,
				mark: mark
			})
		}

		(async() => {
				sessionStorage.setItem(key, JSON.stringify(cards))
				localStorage.setItem(key, JSON.stringify(cards))
		})();

		return cards
	}

}

export const getCourseCard = async(courseId) => {
	const key = `course-cards`

	// check session storage
	const sessionCards = JSON.parse(sessionStorage.getItem(key))
	const session = sessionCards.find((card) => card.id == courseId)
	if (session) {
		return session
	}

	// check local storage
	const localCards = JSON.parse(localStorage.getItem(key))
	const local = localCards.find((card) => card.id == courseId)
	if (local) {
		return local
	}

	// create it
	const courses = await get('course')
	if (courses) {
		const course = courses.find((item) => item.id == courseId)
		if (course) {
			const notebookWords = await getCourseWords(courseId)
			const lessonCount = await getLessonCount(courseId)
			const questionCount = await getQuestionCount(courseId)
			const mark = await getCourseMark(courseId)

			const card = {
				id: course.id,
				title: course.title,
				description: course.description,
				notebookWords: notebookWords,
				questionCount: questionCount,
				lessonCount: lessonCount,
				mark: mark
			}
			
			(async() => {
					if( localCards ) {
						sessionStorage.setItem(key, JSON.stringify([...localCards, card]))
						localStorage.setItem(key, JSON.stringify([...localCards, card]))
					}
					else {
						sessionStorage.setItem(key, JSON.stringify([card]))
						localStorage.setItem(key, JSON.stringify([card]))
					}
			})();
			
			return card;
		}
	}
}
