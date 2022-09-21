import { render } from '@redwoodjs/testing/web'

import QuestionFullForm from './QuestionFullForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionFullForm', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionFullForm />)
		}).not.toThrow()
	})
})
