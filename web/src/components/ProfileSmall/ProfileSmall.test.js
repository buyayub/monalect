import { render } from '@redwoodjs/testing/web'

import ProfileSmall from './ProfileSmall'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileSmall', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileSmall />)
    }).not.toThrow()
  })
})
