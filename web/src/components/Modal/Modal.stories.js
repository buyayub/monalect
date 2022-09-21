import Modal from './Modal'
import LearningMaterialForm from 'src/components/LearningMaterialForm'

export const generated = () => {
	return (
		<Modal title="Add Material">
			<LearningMaterialForm />
		</Modal>
	)
}

export default { title: 'Components/Modal' }
