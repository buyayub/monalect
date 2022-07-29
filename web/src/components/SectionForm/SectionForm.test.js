import { render } from '@redwoodjs/testing/web'

import SectionForm from './SectionForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SectionForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionForm />)
    }).not.toThrow()
  })
})
