import { render } from '@redwoodjs/testing/web'

import QuestionAnswerForm from './QuestionAnswerForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionAnswerForm', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionAnswerForm />)
		}).not.toThrow()
	})
})
