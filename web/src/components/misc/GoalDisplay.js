import  { Button } from 'src/components';

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
		<div className="mn-flex-row mn-gap-small mn-justify-space-between mn-hover">
			<div className="mn-flex-row mn-gap-small mn-hover">
			<progress max={goal} value={measure} />
			<div className="main">
				<p>{title}</p>
			</div>
			</div>
			<Button className="mn-is-tertiary mn-on-hover">
				Fail?	
			</Button>
		</div>
	)
}

export default GoalDisplay
