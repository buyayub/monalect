import { render } from '@redwoodjs/testing/web'

import CourseNavBar from './CourseNavBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CourseNavBar', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseNavBar />)
		}).not.toThrow()
	})
})
