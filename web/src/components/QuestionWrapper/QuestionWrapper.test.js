import { render } from '@redwoodjs/testing/web'

import QuestionWrapper from './QuestionWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionWrapper', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionWrapper />)
		}).not.toThrow()
	})
})
