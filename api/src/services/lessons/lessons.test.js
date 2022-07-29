import { lessons, lesson, deleteLesson } from './lessons'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('lessons', () => {
  scenario('returns all lessons', async (scenario) => {
    const result = await lessons()

    expect(result.length).toEqual(Object.keys(scenario.lesson).length)
  })

  scenario('returns a single lesson', async (scenario) => {
    const result = await lesson({ id: scenario.lesson.one.id })

    expect(result).toEqual(scenario.lesson.one)
  })

  scenario('deletes a lesson', async (scenario) => {
    const original = await deleteLesson({ id: scenario.lesson.one.id })
    const result = await lesson({ id: original.id })

    expect(result).toEqual(null)
  })
})
