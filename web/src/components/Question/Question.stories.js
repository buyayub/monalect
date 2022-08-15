import Question from './Question'

const wordQuestion = {
		type: "word",
		title: "Can you give an example of a carbohydrate?",
		answers: {
			correct: [ "Galactose", "Fructose", "Sucrose", "Maltose" ]
		}
}

const multipleQuestion = {
		type: "multiple",
		choices: 4,
		title: "Which ones's a carbohydrate?",
		answers: {
			correct: [ "Cellulose", "Fructose", "Fiber"],
			incorrect: [ "Peptide", "Maltodextrin", "Lipid", "Cholesterol" ]
		}
}

const questionEmpty  = {
		type: "multiple",
		choices: 4,
		title: "Which ones's a carbohydrate?",
		answers: {
			correct: [],
			incorrect: []
		}
}

export const word = () => {
	return <Question question={wordQuestion} />
}
export const wordActive = () => {
	return <Question question={wordQuestion} active={true} />
}

export const multiple = () => {
	return <Question question={multipleQuestion} />
}

export const multipleActive = () => {
	return <Question question={multipleQuestion} active={true} />
}

export const multipleEmpty = () => {
	return <Question question={questionEmpty} active={true} />
}

export default { title: 'Components/Question' }
