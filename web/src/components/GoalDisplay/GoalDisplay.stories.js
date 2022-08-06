import GoalDisplay from './GoalDisplay'

export const generated = () => {
	return <GoalDisplay type="word" allLessons={true} measure={40} goal={100} />
}

export default { title: 'Components/GoalDisplay' }
