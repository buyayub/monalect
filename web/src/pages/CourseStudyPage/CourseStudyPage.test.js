import { render } from '@redwoodjs/testing/web'

import CourseStudyPage from './CourseStudyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CourseStudyPage', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseStudyPage />)
		}).not.toThrow()
	})
})
