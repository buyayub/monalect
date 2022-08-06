import { render } from '@redwoodjs/testing/web'

import CourseCard from './CourseCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CourseCard', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseCard />)
		}).not.toThrow()
	})
})
