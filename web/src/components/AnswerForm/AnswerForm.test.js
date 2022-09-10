import { render } from '@redwoodjs/testing/web'

import AnswerForm from './AnswerForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnswerForm', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<AnswerForm />)
		}).not.toThrow()
	})
})
