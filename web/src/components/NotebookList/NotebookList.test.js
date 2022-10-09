import { render } from '@redwoodjs/testing/web'

import NotebookList from './NotebookList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NotebookList', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<NotebookList />)
		}).not.toThrow()
	})
})
