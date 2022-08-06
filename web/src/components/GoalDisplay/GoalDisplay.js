const GoalDisplay = ({type, completed, lessonIndex, allLessons, measure, goal}) => {

	let title = ''

	switch (type) {
		case 'word':
			title += `Write ${goal} words `;
			break;
		case 'question':
			title += `Create ${goal} questions `;
			break;
	}

	title += `in ${allLessons ? `all lessons.` : `lesson ${lessonIndex}.` } `

	return (
		<div className="mn-c-goal-display">
			<div className="progress-bar">
				<progress max={goal} value={measure} />
			</div>
			<div className="main">
				<p>{title}</p>
			</div>
		</div>
	)
}

export default GoalDisplay
