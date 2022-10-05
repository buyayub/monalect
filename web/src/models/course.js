import { get, getMany } from 'idb-keyval'

export const getDropdown = async () => {
	const key = `course-dropdown`

	let list = JSON.parse(sessionStorage.getItem(key))
	if (list) return list

	list = JSON.parse(localStorage.getItem(key))
	if (list) {
		sessionStorage.setItem(key, list)
		return list
	}

	const courses = await get('course')
	if (courses) {
		const dropdown = courses.map((course) => ({ value: course.id, title: course.title }))
		;(async () => {
			sessionStorage.setItem(key, JSON.stringify(dropdown))
			localStorage.setItem(key, JSON.stringify(dropdown))
		})()
		return dropdown;
	}
}
