import {
	textbookSections,
	textbookSection,
	createTextbookSection,
	updateTextbookSection,
	deleteTextbookSection,
} from './textbookSections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('textbookSections', () => {
	scenario('returns all textbookSections', async (scenario) => {
		const result = await textbookSections()

		expect(result.length).toEqual(Object.keys(scenario.textbookSection).length)
	})

	scenario('returns a single textbookSection', async (scenario) => {
		const result = await textbookSection({
			id: scenario.textbookSection.one.id,
		})

		expect(result).toEqual(scenario.textbookSection.one)
	})

	scenario('creates a textbookSection', async (scenario) => {
		const result = await createTextbookSection({
			input: {
				userId: scenario.textbookSection.two.userId,
				start: 6462959,
				end: 6919060,
				textbookId: scenario.textbookSection.two.textbookId,
			},
		})

		expect(result.userId).toEqual(scenario.textbookSection.two.userId)
		expect(result.start).toEqual(6462959)
		expect(result.end).toEqual(6919060)
		expect(result.textbookId).toEqual(scenario.textbookSection.two.textbookId)
	})

	scenario('updates a textbookSection', async (scenario) => {
		const original = await textbookSection({
			id: scenario.textbookSection.one.id,
		})

		const result = await updateTextbookSection({
			id: original.id,
			input: { start: 4066917 },
		})

		expect(result.start).toEqual(4066917)
	})

	scenario('deletes a textbookSection', async (scenario) => {
		const original = await deleteTextbookSection({
			id: scenario.textbookSection.one.id,
		})

		const result = await textbookSection({ id: original.id })

		expect(result).toEqual(null)
	})
})
