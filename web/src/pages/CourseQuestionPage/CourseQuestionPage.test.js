import { render } from '@redwoodjs/testing/web'

import CourseQuestionPage from './CourseQuestionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CourseQuestionPage', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<CourseQuestionPage />)
		}).not.toThrow()
	})
})
