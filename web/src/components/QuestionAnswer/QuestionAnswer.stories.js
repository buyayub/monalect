import QuestionAnswer from './QuestionAnswer'

export const generated = () => {
	return <QuestionAnswer />
}


export const incorrect = () => {
	return <QuestionAnswer correct={false} />
}

export default { title: 'Components/QuestionAnswer' }

