import { render } from '@redwoodjs/testing/web'

import MonalectPage from './MonalectPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MonalectPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonalectPage />)
    }).not.toThrow()
  })
})
