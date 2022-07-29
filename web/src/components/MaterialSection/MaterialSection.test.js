import { render } from '@redwoodjs/testing/web'

import MaterialSection from './MaterialSection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MaterialSection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MaterialSection />)
    }).not.toThrow()
  })
})
