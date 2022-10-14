import { deleteCourse as deleteCourseDB } from 'src/controller/course/database'
import { deleteCourse as deleteCourseAPI } from 'src/controller/course/api'

export const deleteCourse = async (client, userId, courseId) => {
	localStorage.removeItem(`course-${courseId}`)
	sessionStorage.removeItem(`course-${courseId}`)
	localStorage.removeItem(`${courseId}-stats`)
	sessionStorage.removeItem(`${courseId}-stats`)

	deleteCourseDB(courseId)
	deleteCourseAPI(client, userId, courseId)

	let cards = localStorage.getItem('course-cards')
	if (cards) {
		cards = JSON.parse(cards).filter((card) => card.id != courseId)
		localStorage.setItem('course-cards', JSON.stringify(cards))
		sessionStorage.setItem('course-cards', JSON.stringify(cards))
	}

	let dropdown = localStorage.getItem('course-dropdown')
	if (dropdown) {
		dropdown = JSON.parse(dropdown).filter((item) => item.value != courseId)
		localStorage.setItem('course-dropdown', JSON.stringify(dropdown))
		sessionStorage.setItem('course-dropdown', JSON.stringify(dropdown))
	}

	console.debug(`course ${courseId} deleted from web storage`)
}
