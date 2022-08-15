import { render } from '@redwoodjs/testing/web'

import QuestionAnswer from './QuestionAnswer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionAnswer', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionAnswer />)
		}).not.toThrow()
	})
})
