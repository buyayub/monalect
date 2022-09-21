import Dropdown from './Dropdown'

const mockItems = [ 
	{
		title: "Orange",
		value: "orange"
	},
	{
		title: "Strawberry",
		value: "strawberry"
	},
	{
		title: "SUQRQWERPQOWERIQWER",
		value: "eqwrqwer"
	}
]

export const generated = () => {
  return <Dropdown items={mockItems} name="taste" label="Menu" />
}

export default { title: 'Components/Dropdown' }
