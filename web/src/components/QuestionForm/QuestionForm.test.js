import { render } from '@redwoodjs/testing/web'

import QuestionForm from './QuestionForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionForm', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionForm />)
		}).not.toThrow()
	})
})
