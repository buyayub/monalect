import { render } from '@redwoodjs/testing/web'

import LessonBlock from './LessonBlock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonBlock', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<LessonBlock />)
		}).not.toThrow()
	})
})
