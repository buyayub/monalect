import { render } from '@redwoodjs/testing/web'

import IconDropdown from './IconDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IconDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IconDropdown />)
    }).not.toThrow()
  })
})
