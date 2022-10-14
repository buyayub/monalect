import { render } from '@redwoodjs/testing/web'

import LessonList from './LessonList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonList', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<LessonList />)
		}).not.toThrow()
	})
})
