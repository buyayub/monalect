import LessonDisplay from './LessonDisplay'

export const generated = () => {
	return (
		<LessonDisplay
			index={0}
			active={true}
			title="Lesson Title"
			notebookWords={0}
			questionCount={0}
			mark={0}
		/>
	)
}

export default { title: 'Components/LessonDisplay' }
