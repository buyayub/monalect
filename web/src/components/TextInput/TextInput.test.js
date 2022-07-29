import { render } from '@redwoodjs/testing/web'

import TextInput from './TextInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TextInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TextInput />)
    }).not.toThrow()
  })
})
