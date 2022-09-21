import Button from './Button'

export const primary = () => {
	return <Button>Primary</Button>
}

export const secondary = () => {
	return <Button className="mn-is-secondary">Secondary</Button>
}

export const both = () => {
	return (
		<>
			<Button>Large</Button>
			<Button className="mn-is-secondary">Large</Button>
			<Button className="mn-is-secondary-bg">Large</Button>
			<Button className="mn-is-danger">Large</Button>
			<Button>boomshaklakjasdlfjkaksldfjasldfj</Button>
			<Button className="mn-is-tertiary">Hello</Button>
		</>
	)
}

export const largeSecondary = () => {
	return <Button className="mn-is-large mn-is-secondary">Large</Button>
}

export const danger = () => {
	return <Button className="mn-is-danger">Danger</Button>
}

export default { title: 'Components/Button' }
