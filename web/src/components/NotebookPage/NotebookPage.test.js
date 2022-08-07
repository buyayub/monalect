import { render } from '@redwoodjs/testing/web'

import NotebookPage from './NotebookPage'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NotebookPage', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<NotebookPage />)
		}).not.toThrow()
	})
})
