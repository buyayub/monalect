import { render } from '@redwoodjs/testing/web'

import LearningMaterial from './LearningMaterial'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LearningMaterial', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LearningMaterial />)
    }).not.toThrow()
  })
})
