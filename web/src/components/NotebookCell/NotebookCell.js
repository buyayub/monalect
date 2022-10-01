import NotebookPage from 'src/components/NotebookPage'

export const QUERY = gql`
	query FindNotebookQuery($userId: Int!, $courseId: Int!) {
		notebookPages(courseId: $courseId, userId: $userId) {
			id
			content
			index
			lessonTitle
		}
	}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
	<div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ notebookPages }) => {
	return (
		<>
			<div className="mn-flex-column mn-gap-x-large mn-scrollable mn-height-full mn-padding-right-medium">
				{notebookPages.map((page, i) => {
					return (
						<NotebookPage
							index={page.index + 1}
							title={page.lessonTitle}
							content={page.content}
							id={page.id}
							key={page.id}
						/>
					)
				})}
			</div>
		</>
	)
}
