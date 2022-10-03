import { render } from '@redwoodjs/testing/web'

import Database from './Database'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Database', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<Database />)
		}).not.toThrow()
	})
})
