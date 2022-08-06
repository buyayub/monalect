import { render } from '@redwoodjs/testing/web'

import CourseHomePage from './CourseHomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CourseHomePage', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseHomePage />)
		}).not.toThrow()
	})
})
