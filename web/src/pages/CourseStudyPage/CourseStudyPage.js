import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

import { useState } from 'react'
import NavBar from 'src/components/NavBar'
import NotebookCell from 'src/components/NotebookCell'
import PDFviewerCell from 'src/components/PDFviewerCell'

const CourseStudyPage = ({ courseId }) => {
	const { currentUser } = useAuth() 
	const [ bookUrl, setBookUrl ] = useState("")
	
	return (
		<div id="course-study-page">
			<MetaTags title="CourseStudy" description="CourseStudy page" />
			<NavBar courseId={courseId} />
			<main>
				<PDFviewerCell userId={currentUser.id} courseId={parseInt(courseId)}/>
				<NotebookCell userId={currentUser.id} courseId={parseInt(courseId)} />
			</main>
		</div>
	)
}

export default CourseStudyPage
