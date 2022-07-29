import { render } from '@redwoodjs/testing/web'

import LessonWrapper from './LessonWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LessonWrapper />)
    }).not.toThrow()
  })
})
