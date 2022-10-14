import { render } from '@redwoodjs/testing/web'

import PdfViewer from './PdfViewer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PdfViewer', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<PdfViewer />)
		}).not.toThrow()
	})
})
