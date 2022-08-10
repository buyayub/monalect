import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

import {useRef, useEffect} from 'react'
import NavBar from 'src/components/NavBar'
import NotebookCell from 'src/components/NotebookCell'

const GET_TEXTBOOKS = gql` 
	query GetTheTextbooks($userId: Int!, $courseId: Int!) {
		textbooks(userId: $userId, courseId: $courseId)  {
			id
			url
			title
		}
	}
`


const CourseStudyPage = ({ courseId }) => {
	const { currentUser } = useAuth() 
	const viewer = useRef(null);
	const { data } = useQuery(GET_TEXTBOOKS, { 
		variables: { userId: currentUser.id, courseId: parseInt(courseId) }
	})
	
	return (
		<div id="course-study-page">
			<MetaTags title="CourseStudy" description="CourseStudy page" />
			<NavBar courseId={courseId} />
			<main>
				<object
					data="/book.pdf"
					type="application/pdf"
					className="webviewer"
				>
				</object>
				<NotebookCell userId={currentUser.id} courseId={parseInt(courseId)} />
			</main>
		</div>
	)
}

export default CourseStudyPage
