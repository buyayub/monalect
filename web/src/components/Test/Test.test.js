import { render } from '@redwoodjs/testing/web'

import Test from './Test'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Test', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<Test />)
		}).not.toThrow()
	})
})
