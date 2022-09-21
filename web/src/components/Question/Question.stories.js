import Question from './Question'

const wordQuestion = {
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
}

const multipleQuestion = {
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
}

const questionEmpty = {
	type: 'multiple',
	choices: 4,
	title: "Which ones's a carbohydrate?",
	answers: []
}

export const word = () => {
	return <Question question={wordQuestion} />
}

export const multiple = () => {
	return <Question question={multipleQuestion} />
}

export const multipleEmpty = () => {
	return <Question question={questionEmpty} />
}

export default { title: 'Components/Question' }
