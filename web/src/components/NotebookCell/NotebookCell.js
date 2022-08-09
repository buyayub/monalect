import NotebookPage from  'src/components/NotebookPage';

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
		<div class="mn-c-notebook-container">
			{ notebookPages.map((page, i) => {
				return (
					<div class="notebook-lesson">
						<h4>{page.index + 1}. {page.lessonTitle}</h4>
						<NotebookPage content={page.content} id={page.id} />
					</div>
				)
			})}
		</div>
	)
}
