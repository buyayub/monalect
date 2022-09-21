import QuestionLesson from './QuestionLesson'

const lesson = {
	title: 'Intro to Biochemistry',
	index: 0,
	questions: [
		{
			type: 'word',
			title: 'Can you give an example of a carbohydrate?',
			answers: [
				{
					id: 0,
					answer: 'Galactose',
					correct: true,
				},
				{
					id: 1,
					answer: 'Fructose',
					correct: true,
				},
				{
					id: 2,
					answer: 'Sucrose',
					correct: true,
				},
				{
					id: 3,
					answer: 'Maltose',
					correct: true,
				},
			],
		},
		{
			type: 'multiple',
			choices: 4,
			title: "Which ones's a carbohydrate?",
			answers: [
				{
					id: 0,
					answer: 'Cellulose',
					correct: true,
				},
				{
					id: 1,
					answer: 'Fructose',
					correct: true,
				},
				{
					id: 2,
					answer: 'Fiber',
					correct: true,
				},
				{
					id: 3,
					answer: 'Peptide',
					correct: false,
				},
				{
					id: 4,
					answer: 'Maltodextrin',
					correct: false,
				},
				{
					id: 5,
					answer: 'Lipid',
					correct: false,
				},
				{
					id: 6,
					answer: 'Cholesterol',
					correct: false,
				},
			],
		},
	],
}

export const question = () => {
	return <QuestionLesson lesson={lesson} />
}

export default { title: 'Components/QuestionLesson' }
