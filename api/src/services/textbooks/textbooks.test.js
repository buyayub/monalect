import {
	textbooks,
	textbook,
	createTextbook,
	updateTextbook,
	deleteTextbook,
} from './textbooks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('textbooks', () => {
	scenario('returns all textbooks', async (scenario) => {
		const result = await textbooks()

		expect(result.length).toEqual(Object.keys(scenario.textbook).length)
	})

	scenario('returns a single textbook', async (scenario) => {
		const result = await textbook({ id: scenario.textbook.one.id })

		expect(result).toEqual(scenario.textbook.one)
	})

	scenario('creates a textbook', async (scenario) => {
		const result = await createTextbook({
			input: {
				userId: scenario.textbook.two.userId,
				courseId: scenario.textbook.two.courseId,
			},
		})

		expect(result.userId).toEqual(scenario.textbook.two.userId)
		expect(result.courseId).toEqual(scenario.textbook.two.courseId)
	})

	scenario('updates a textbook', async (scenario) => {
		const original = await textbook({ id: scenario.textbook.one.id })
		const result = await updateTextbook({
			id: original.id,
			input: { userId: scenario.textbook.two.userId },
		})

		expect(result.userId).toEqual(scenario.textbook.two.userId)
	})

	scenario('deletes a textbook', async (scenario) => {
		const original = await deleteTextbook({ id: scenario.textbook.one.id })
		const result = await textbook({ id: original.id })

		expect(result).toEqual(null)
	})
})
