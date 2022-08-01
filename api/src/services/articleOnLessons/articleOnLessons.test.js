import {
	articleOnLessons,
	articleOnLesson,
	createArticleOnLesson,
	updateArticleOnLesson,
	deleteArticleOnLesson,
} from './articleOnLessons'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('articleOnLessons', () => {
	scenario('returns all articleOnLessons', async (scenario) => {
		const result = await articleOnLessons()

		expect(result.length).toEqual(Object.keys(scenario.articleOnLesson).length)
	})

	scenario('returns a single articleOnLesson', async (scenario) => {
		const result = await articleOnLesson({
			id: scenario.articleOnLesson.one.id,
		})

		expect(result).toEqual(scenario.articleOnLesson.one)
	})

	scenario('creates a articleOnLesson', async (scenario) => {
		const result = await createArticleOnLesson({
			input: {
				lessonId: scenario.articleOnLesson.two.lessonId,
				articleId: scenario.articleOnLesson.two.articleId,
			},
		})

		expect(result.lessonId).toEqual(scenario.articleOnLesson.two.lessonId)
		expect(result.articleId).toEqual(scenario.articleOnLesson.two.articleId)
	})

	scenario('updates a articleOnLesson', async (scenario) => {
		const original = await articleOnLesson({
			id: scenario.articleOnLesson.one.id,
		})

		const result = await updateArticleOnLesson({
			id: original.id,
			input: { lessonId: scenario.articleOnLesson.two.lessonId },
		})

		expect(result.lessonId).toEqual(scenario.articleOnLesson.two.lessonId)
	})

	scenario('deletes a articleOnLesson', async (scenario) => {
		const original = await deleteArticleOnLesson({
			id: scenario.articleOnLesson.one.id,
		})

		const result = await articleOnLesson({ id: original.id })

		expect(result).toEqual(null)
	})
})
