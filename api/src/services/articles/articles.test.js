import {
	articles,
	article,
	createArticle,
	updateArticle,
	deleteArticle,
} from './articles'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('articles', () => {
	scenario('returns all articles', async (scenario) => {
		const result = await articles()

		expect(result.length).toEqual(Object.keys(scenario.article).length)
	})

	scenario('returns a single article', async (scenario) => {
		const result = await article({ id: scenario.article.one.id })

		expect(result).toEqual(scenario.article.one)
	})

	scenario('creates a article', async (scenario) => {
		const result = await createArticle({
			input: {
				userId: scenario.article.two.userId,
				uploaded: true,
				courseId: scenario.article.two.courseId,
			},
		})

		expect(result.userId).toEqual(scenario.article.two.userId)
		expect(result.uploaded).toEqual(true)
		expect(result.courseId).toEqual(scenario.article.two.courseId)
	})

	scenario('updates a article', async (scenario) => {
		const original = await article({ id: scenario.article.one.id })
		const result = await updateArticle({
			id: original.id,
			input: { uploaded: false },
		})

		expect(result.uploaded).toEqual(false)
	})

	scenario('deletes a article', async (scenario) => {
		const original = await deleteArticle({ id: scenario.article.one.id })
		const result = await article({ id: original.id })

		expect(result).toEqual(null)
	})
})
