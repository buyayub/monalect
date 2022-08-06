import { render } from '@redwoodjs/testing/web'

import LessonDisplay from './LessonDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonDisplay', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<LessonDisplay />)
		}).not.toThrow()
	})
})
