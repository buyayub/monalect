import { render } from '@redwoodjs/testing/web'

import CourseLayout from './CourseLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CourseLayout', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseLayout />)
		}).not.toThrow()
	})
})
