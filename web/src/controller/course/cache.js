import { update } from 'idb-keyval'

// course: id, title, description
export const updateCourse = (input) => {
	const key = `course-${input.id}`
	let data = JSON.parse(localStorage.getItem(key))

	if (data) {
		if (input.title) data.title = input.title
		if (input.description) data.description = input.description
		localStorage.setItem(key, JSON.stringify(data))
		sessionStorage.setItem(key, JSON.stringify(data))
	}

	const key2 = `course-dropdown`
	let dropdown = JSON.parse(localStorage.getItem(key2))

	if (dropdown) {
		dropdown.find((item) => item.value == input.id).title = input.title
		localStorage.setItem(key2, JSON.stringify(dropdown))
		sessionStorage.setItem(key2, JSON.stringify(dropdown))
	}

	updateCourseCard({id: input.id, title: input.title, description: input.description})

	update('course', (courses) => {
		const index = courses.findIndex((item) => item.id == input.id)
		if (input.title) courses[index].title = input.title
		if (input.description) courses[index].description = input.description
		return courses
	})

}

export const updateCourseCard = (input) => {
	const key = `course-cards`

	let data = JSON.parse(localStorage.getItem(key))
	if (data) {
		const index = data.findIndex(item => item.id == input.id) 
		if (input.title) data[index].title = input.title
		if (input.description) data[index].description = input.description

		localStorage.setItem(key, JSON.stringify(data))
		sessionStorage.setItem(key, JSON.stringify(data))
	}
}

