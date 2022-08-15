import { render } from '@redwoodjs/testing/web'

import QuestionLesson from './QuestionLesson'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('QuestionLesson', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<QuestionLesson />)
		}).not.toThrow()
	})
})
