import CourseCard from 'src/components/CourseCard'

export const QUERY = gql`
	query CourseCardsQuery($userId: Int!) {
		cards(userId: $userId) {
			id
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

export const Success = ({ cards }) => {
	return (
		<div className="mn-flex-column mn-gap-medium mn-padding-right-small">
			{cards.map((item) => {
				return (
					<CourseCard
						courseId={item.id}
						courseTitle={
							item.title !== '' && item.title != null ? item.title : 'Untitled'
						}
						notebookWords={item.notebookWords}
						questionCount={item.questionCount}
						mark={item.mark}
					/>
				)
			})}
		</div>
	)
}
