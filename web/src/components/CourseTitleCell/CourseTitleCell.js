import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

export const QUERY = gql`
	query FindCourseTitleQuery($courseId: Int!) {
		card(courseId: $courseId) {
			title
			notebookWords
			questionCount
		}
	}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
	<div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ card }) => {
	return (
		<div id="mn-i-course-title">
			<h2>{card.title == '' ? 'Untitled' : card.title}</h2>
			<div className="course-stats">
				<span>
					<FiHelpCircle />
					<h4>{card.notebookWords == null ? 0 : notebookWords}</h4>
				</span>
				<span>
					<RiBook2Line />
					<h4>{card.questionCount}</h4>
				</span>
			</div>
		</div>
	)
}
