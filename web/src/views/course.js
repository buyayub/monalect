import { get, getMany } from 'idb-keyval'
import { cache, db } from 'src/lib/cache'

export const getDropdown = async () => {
	const key = `course-dropdown`

	let list = cache.get(key)
	if (list) return list

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

