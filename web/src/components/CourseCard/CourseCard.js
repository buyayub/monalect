import { Link, routes } from "@redwoodjs/router"
import {FiHelpCircle} from 'react-icons/fi';
import {RiBook2Line} from 'react-icons/ri';

const CourseCard = ({courseId, courseTitle, notebookWords, questionCount, mark}) => {
	return (
		<Link to={routes.courseHome({courseId: courseId, courseTitle: courseTitle, questionCount: questionCount, notebookWord: notebookWords})}>
		<div className="mn-c-course-card">
			<h4>{courseTitle}</h4>
			<div className="bottom">
				<div className="aggregates">
					<div>
						<FiHelpCircle />
						<p>{notebookWords == null ? 0 : notebookWords}</p>
					</div>
					<div>
						<RiBook2Line />
						<p>{questionCount}</p>
					</div>
				</div>
				<h4>{mark}%</h4>
			</div>
		</div>
		</Link>
	)
}

export default CourseCard
