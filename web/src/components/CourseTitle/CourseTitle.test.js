import { render } from '@redwoodjs/testing/web'

import CourseTitle from './CourseTitle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CourseTitle', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseTitle />)
		}).not.toThrow()
	})
})
