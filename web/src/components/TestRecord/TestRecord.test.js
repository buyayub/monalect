import { render } from '@redwoodjs/testing/web'

import TestRecord from './TestRecord'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TestRecord', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<TestRecord />)
		}).not.toThrow()
	})
})
