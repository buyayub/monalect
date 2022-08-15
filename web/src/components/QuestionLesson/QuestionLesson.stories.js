import QuestionLesson from './QuestionLesson'

const lesson = {
	title: 'Intro to Biochemistry',
	index: 0,
	questions: [
		{
			type: 'word',
			title: 'Can you give an example of a carbohydrate?',
			answers: {
				correct: ['Galactose', 'Fructose', 'Sucrose', 'Maltose'],
			},
		},
		{
			type: 'multiple',
			choices: 4,
			title: "Which ones's a carbohydrate?",
			answers: {
				correct: ['Cellulose', 'Fructose', 'Fiber'],
				incorrect: ['Peptide', 'Maltodextrin', 'Lipid', 'Cholesterol'],
			},
		},
	],
}

export const question = () => {
	return <QuestionLesson lesson={lesson} />
}

export default { title: 'Components/QuestionLesson' }
