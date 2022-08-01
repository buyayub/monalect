import {
	sectionOnLessons,
	sectionOnLesson,
	createSectionOnLesson,
	updateSectionOnLesson,
	deleteSectionOnLesson,
} from './sectionOnLessons'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sectionOnLessons', () => {
	scenario('returns all sectionOnLessons', async (scenario) => {
		const result = await sectionOnLessons()

		expect(result.length).toEqual(Object.keys(scenario.sectionOnLesson).length)
	})

	scenario('returns a single sectionOnLesson', async (scenario) => {
		const result = await sectionOnLesson({
			id: scenario.sectionOnLesson.one.id,
		})

		expect(result).toEqual(scenario.sectionOnLesson.one)
	})

	scenario('creates a sectionOnLesson', async (scenario) => {
		const result = await createSectionOnLesson({
			input: {
				lessonId: scenario.sectionOnLesson.two.lessonId,
				sectionId: scenario.sectionOnLesson.two.sectionId,
			},
		})

		expect(result.lessonId).toEqual(scenario.sectionOnLesson.two.lessonId)
		expect(result.sectionId).toEqual(scenario.sectionOnLesson.two.sectionId)
	})

	scenario('updates a sectionOnLesson', async (scenario) => {
		const original = await sectionOnLesson({
			id: scenario.sectionOnLesson.one.id,
		})

		const result = await updateSectionOnLesson({
			id: original.id,
			input: { lessonId: scenario.sectionOnLesson.two.lessonId },
		})

		expect(result.lessonId).toEqual(scenario.sectionOnLesson.two.lessonId)
	})

	scenario('deletes a sectionOnLesson', async (scenario) => {
		const original = await deleteSectionOnLesson({
			id: scenario.sectionOnLesson.one.id,
		})

		const result = await sectionOnLesson({ id: original.id })

		expect(result).toEqual(null)
	})
})
