import TextInput from './TextInput'

export const normal = () => {
  return <TextInput />
}

export const description = () => {
  return <TextInput description="description"/>
}

export const label = () => {
  return <TextInput label="Label"/>
}

export const everything = () => {
  return <TextInput label="Label" description="description" placeholder="Placeholder"/>
}

export const error = () => {
  return <TextInput required={true} />
}

export default { title: 'Components/TextInput' }
