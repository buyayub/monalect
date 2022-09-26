import { Link, routes } from '@redwoodjs/router'
import { FiHelpCircle, FiList } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

const CourseCard = ({
	courseId,
	courseTitle = 'Untitled',
	description = 'No description.',
	notebookWords = 0,
	questionCount = 0,
	mark = 0,
	lessons = 0,
}) => {
	return (
		<Link
			to={routes.courseHome({
				courseId: courseId,
				courseTitle: courseTitle,
				questionCount: questionCount,
				notebookWord: notebookWords,
				mark: mark
			})}
		>
			<div className="mn-c-card">
				<div className="mn-flex-column mn-gap-small">
					<div className="mn-flex-row mn-justify-space-between">
						<h2>{courseTitle}</h2>
						<h3>{mark}%</h3>
					</div>
					<div>{description}</div>
					<div className="mn-flex-row mn-gap-large mn-justify-end">
						<div className="mn-flex-row mn-gap-small">
							<FiList />
							<p>{lessons}</p>
						</div>
						<div className="mn-flex-row mn-gap-small">
							<RiBook2Line />
							<p>{notebookWords}</p>
						</div>
						<div className="mn-flex-row mn-gap-small">
							<FiHelpCircle />
							<p>{questionCount}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CourseCard
