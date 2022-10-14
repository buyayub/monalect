import { cache } from 'src/shared/cache'

export const createTest = async (courseId, input) =>{
	const key = `course-${courseId}`
	cache.apply(key, (course) => {
		if(!course.tests) course.tests = [] 
		course.tests.push({
			...input,
			date: Date.now()
		})
		return course
	})
}

