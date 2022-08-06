import { render } from '@redwoodjs/testing/web'

import LessonMaterialDisplay from './LessonMaterialDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LessonMaterialDisplay', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<LessonMaterialDisplay />)
		}).not.toThrow()
	})
})
