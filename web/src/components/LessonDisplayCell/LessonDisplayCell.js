import LessonDisplay from 'src/components/LessonDisplay'
import LessonMaterialDisplay from 'src/components/LessonMaterialDisplay'

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
	console.log(lessons)
	return (
		<div className="mn-c-lesson-display-container">
			{lessons.map((lesson, i) => {
				return (
					<div className="lesson-block">
					<LessonDisplay
						index={lesson.index + 1}
						title={lesson.title}
						notebookWords={lesson.notebookWords}
						questionCount={lesson.questionCount}
					/>
						<div className="material-container">
							{ lesson.articles.map((article) => <LessonMaterialDisplay 
								type="article"
								title={article.title}
							/>) }
							{ lesson.sections.map((section) => 
								<LessonMaterialDisplay
								type="section"
								title={section.title}
								start={section.start}
								end={section.end}
								/>
							)}
						</div>
					</div>
					
				)
			})}
		</div>
	)
}
