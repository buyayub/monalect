import { render } from '@redwoodjs/testing/web'

import TestLessonWrapper from './TestLessonWrapper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TestLessonWrapper', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<TestLessonWrapper />)
		}).not.toThrow()
	})
})
