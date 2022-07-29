import {
  choices,
  choice,
  createChoice,
  updateChoice,
  deleteChoice,
} from './choices'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('choices', () => {
  scenario('returns all choices', async (scenario) => {
    const result = await choices()

    expect(result.length).toEqual(Object.keys(scenario.choice).length)
  })

  scenario('returns a single choice', async (scenario) => {
    const result = await choice({ id: scenario.choice.one.id })

    expect(result).toEqual(scenario.choice.one)
  })

  scenario('creates a choice', async (scenario) => {
    const result = await createChoice({
      input: { choice: 'String', questionId: scenario.choice.two.questionId },
    })

    expect(result.choice).toEqual('String')
    expect(result.questionId).toEqual(scenario.choice.two.questionId)
  })

  scenario('updates a choice', async (scenario) => {
    const original = await choice({ id: scenario.choice.one.id })
    const result = await updateChoice({
      id: original.id,
      input: { choice: 'String2' },
    })

    expect(result.choice).toEqual('String2')
  })

  scenario('deletes a choice', async (scenario) => {
    const original = await deleteChoice({ id: scenario.choice.one.id })
    const result = await choice({ id: original.id })

    expect(result).toEqual(null)
  })
})
