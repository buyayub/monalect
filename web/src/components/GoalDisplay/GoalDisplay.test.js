import { render } from '@redwoodjs/testing/web'

import GoalDisplay from './GoalDisplay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GoalDisplay', () => {
	it('renders successfully', () => {
		expect(() => {
			render(<GoalDisplay />)
		}).not.toThrow()
	})
})
