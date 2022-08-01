import {
	courses,
	course,
	createCourse,
	updateCourse,
	deleteCourse,
} from './courses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('courses', () => {
	scenario('returns all courses', async (scenario) => {
		const result = await courses()

		expect(result.length).toEqual(Object.keys(scenario.course).length)
	})

	scenario('returns a single course', async (scenario) => {
		const result = await course({ id: scenario.course.one.id })

		expect(result).toEqual(scenario.course.one)
	})

	scenario('creates a course', async (scenario) => {
		const result = await createCourse({
			input: { userId: scenario.course.two.userId, title: 'String' },
		})

		expect(result.userId).toEqual(scenario.course.two.userId)
		expect(result.title).toEqual('String')
	})

	scenario('updates a course', async (scenario) => {
		const original = await course({ id: scenario.course.one.id })
		const result = await updateCourse({
			id: original.id,
			input: { title: 'String2' },
		})

		expect(result.title).toEqual('String2')
	})

	scenario('deletes a course', async (scenario) => {
		const original = await deleteCourse({ id: scenario.course.one.id })
		const result = await course({ id: original.id })

		expect(result).toEqual(null)
	})
})
