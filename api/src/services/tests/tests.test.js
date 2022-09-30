import { tests, test, createTest, updateTest, deleteTest } from './tests'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tests', () => {
	scenario('returns all tests', async (scenario) => {
		const result = await tests()

		expect(result.length).toEqual(Object.keys(scenario.test).length)
	})

	scenario('returns a single test', async (scenario) => {
		const result = await test({ id: scenario.test.one.id })

		expect(result).toEqual(scenario.test.one)
	})

	scenario('creates a test', async (scenario) => {
		const result = await createTest({
			input: {
				userId: scenario.test.two.userId,
				quiz: true,
				courseId: scenario.test.two.courseId,
			},
		})

		expect(result.userId).toEqual(scenario.test.two.userId)
		expect(result.quiz).toEqual(true)
		expect(result.courseId).toEqual(scenario.test.two.courseId)
	})

	scenario('updates a test', async (scenario) => {
		const original = await test({ id: scenario.test.one.id })
		const result = await updateTest({
			id: original.id,
			input: { quiz: false },
		})

		expect(result.quiz).toEqual(false)
	})

	scenario('deletes a test', async (scenario) => {
		const original = await deleteTest({ id: scenario.test.one.id })
		const result = await test({ id: original.id })

		expect(result).toEqual(null)
	})
})
