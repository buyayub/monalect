import LessonBlock from './LessonBlock'

const mockLesson = {
	index: 4,
	title: 'Lesson Title',
	notebookWord: 172,
	questionCount: 12,
	mark: 50,
	articles: [
		{
			title: 'First Article',
		},
	],
	sections: [
		{
			title: 'First Section',
			start: 0,
			end: 15,
		},
		{
			title: 'Second Section',
			start: 16,
			end: 30,
		},
	],
}

export const generated = () => {
	return <LessonBlock lesson={mockLesson}/>
}

export default { title: 'Components/LessonBlock' }
