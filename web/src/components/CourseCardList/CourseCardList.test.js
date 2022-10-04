import { render } from '@redwoodjs/testing/web'

import CourseCardList from './CourseCardList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CourseCardList', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseCardList />)
		}).not.toThrow()
	})
})
