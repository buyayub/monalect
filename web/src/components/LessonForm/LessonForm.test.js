import { render } from '@redwoodjs/testing/web'

import LessonForm from './LessonForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonForm', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<LessonForm />)
		}).not.toThrow()
	})
})
