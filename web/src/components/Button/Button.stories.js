import Button from './Button'

export const primary = () => {
  return (
  <Button>
	  Primary
  </Button>
  )
}

export const secondary = () => {
  return (
  <Button className="mn-is-secondary">
	  Large
  </Button>
  )
}

export const large = () => {
  return (
  <Button className="mn-is-large">
	  Large
  </Button>
  )
}

export const largeSecondary = () => {
  return (
  <Button className="mn-is-large mn-is-secondary">
	  Large
  </Button>
  )
}

export const danger = () => {
  return (
  <Button className="mn-is-danger">
	  Danger
  </Button>
  )
}

export default { title: 'Components/Button' }
