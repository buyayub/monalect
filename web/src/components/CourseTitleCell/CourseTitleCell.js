import { FiHelpCircle } from 'react-icons/fi'
import { RiBook2Line } from 'react-icons/ri'

export const QUERY = gql`
	query FindCourseTitleQuery($courseId: Int!) {
		card(courseId: $courseId) {
			title
			notebookWords
			questionCount
			mark
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
		<div className="mn-c-course-header mn-align-center mn-flex-row mn-justify-space-between">
			<div className="mn-flex-row mn-gap-small mn-align-end">
				<h2>{card.title == '' ? 'Untitled' : card.title}</h2>
				<div className="mn-flex-row mn-gap-small">
					<span className="mn-flex-row mn-gap-small">
						<RiBook2Line />
						<h4>{card.notebookWords == null ? 0 : notebookWords}</h4>
					</span>
					<span className="mn-flex-row mn-gap-small">
						<FiHelpCircle />
						<h4>{card.questionCount}</h4>
					</span>
				</div>
			</div>
			<h2>{card.mark}%</h2>
		</div>
	)
}
