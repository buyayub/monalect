import {
  notebookPages,
  notebookPage,
  createNotebookPage,
  updateNotebookPage,
  deleteNotebookPage,
} from './notebookPages'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('notebookPages', () => {
  scenario('returns all notebookPages', async (scenario) => {
    const result = await notebookPages()

    expect(result.length).toEqual(Object.keys(scenario.notebookPage).length)
  })

  scenario('returns a single notebookPage', async (scenario) => {
    const result = await notebookPage({ id: scenario.notebookPage.one.id })

    expect(result).toEqual(scenario.notebookPage.one)
  })

  scenario('creates a notebookPage', async (scenario) => {
    const result = await createNotebookPage({
      input: { page: 6563170, lessonId: scenario.notebookPage.two.lessonId },
    })

    expect(result.page).toEqual(6563170)
    expect(result.lessonId).toEqual(scenario.notebookPage.two.lessonId)
  })

  scenario('updates a notebookPage', async (scenario) => {
    const original = await notebookPage({ id: scenario.notebookPage.one.id })
    const result = await updateNotebookPage({
      id: original.id,
      input: { page: 7577758 },
    })

    expect(result.page).toEqual(7577758)
  })

  scenario('deletes a notebookPage', async (scenario) => {
    const original = await deleteNotebookPage({
      id: scenario.notebookPage.one.id,
    })

    const result = await notebookPage({ id: original.id })

    expect(result).toEqual(null)
  })
})
