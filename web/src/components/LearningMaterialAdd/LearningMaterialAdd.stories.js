import LearningMaterialAdd from './LearningMaterialAdd'

export const normal = () => {
  return <LearningMaterialAdd />
}

export const small = () => {
  return <LearningMaterialAdd className="mn-is-small" label="Add Section" />
}

export default { title: 'Components/LearningMaterialAdd' }
