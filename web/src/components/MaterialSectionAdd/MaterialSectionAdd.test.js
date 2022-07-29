import { render } from '@redwoodjs/testing/web'

import MaterialSectionAdd from './MaterialSectionAdd'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MaterialSectionAdd', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MaterialSectionAdd />)
    }).not.toThrow()
  })
})
