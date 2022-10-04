export const GET_ALL = gql`
	query GetAllQuery($userId: Int!) {
		all(userId: $userId) {
			course {
				id
				title
				description
				createdAt
			}
			lesson {
				id
				courseId
				index
				title
			}
			textbook {
				id
				courseId
				title
				author
				pages
				uploaded
				pageOffset
				isbn
				url
			}
			section {
				id
				title
				start
				end
				textbookId
			}
			article {
				id
				title
				author
				pages
				pageOffset
				doi
				uploaded
				url
				courseId
			}
			question {
				id
				lessonId
				courseId
				question
				multiple
				choices
			}
			answer {
				id
				answer
				correct
				questionId
			}
			test {
				id
				courseId
				correct
				count
				quiz
			}
			notebookPage {
				id
				lessonId
				content
				lessonTitle
				courseId
			}
			sectionOnLesson {
				id
				lessonId
				sectionId
			}
			articleOnLesson {
				id
			}
			testOnLesson {
				id
			}
		}
	}
`
