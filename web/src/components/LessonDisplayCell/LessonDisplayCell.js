import LessonBlock from 'src/components/LessonBlock'

export const QUERY = gql`
	query FindLessonDisplayQuery($courseId: Int!, $userId: Int!) {
		lessons(courseId: $courseId, userId: $userId) {
			id
			title
			notebookWords
			questionCount
			index
			sections {
				title
				start
				end
			}
			articles {
				title
			}
		}
	}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
	<div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ lessons }) => {
	return (
		<div className="mn-flex-column mn-gap-small mn-layout-half">
			{lessons.map((lesson, i) => {
				return (
					<LessonBlock lesson={lesson} />
				)
			})}
		</div>
	)
}
