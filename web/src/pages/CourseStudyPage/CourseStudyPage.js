import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

import WebViewer from '@pdftron/pdfjs-express'
import {useRef, useEffect} from 'react'
import NavBar from 'src/components/NavBar'
import NotebookCell from 'src/components/NotebookCell'

const CourseStudyPage = ({ courseId }) => {
	const { currentUser } = useAuth() 
	const viewer = useRef(null);

	useEffect(() => {
		WebViewer(
			{
				licenseKey: "dAbVz6SrdGktB4xTngTl",
				path: '/',
			},
			viewer.current
		).then((instance) => {
		});
	}, []);


	return (
		<div id="course-study-page">
			<MetaTags title="CourseStudy" description="CourseStudy page" />
			<main>
				<div className="webviewer" ref={viewer}></div>
				<NotebookCell userId={currentUser.id} courseId={parseInt(courseId)} />
			</main>
		</div>
	)
}

export default CourseStudyPage
