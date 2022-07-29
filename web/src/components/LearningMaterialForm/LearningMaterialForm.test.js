import { render } from '@redwoodjs/testing/web'

import LearningMaterialForm from './LearningMaterialForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LearningMaterialForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LearningMaterialForm />)
    }).not.toThrow()
  })
})
