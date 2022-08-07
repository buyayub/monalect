import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { bcMain } from 'src/shared/breadcrumbs'
import WebViewer from '@pdftron/pdfjs-express'
import {useRef, useEffect} from 'react'

import NavBar from 'src/components/NavBar'

const CourseStudyPage = () => {
	bcMain.selected = '/monalect'
	const viewer = useRef(null);

	useEffect(() => {
		WebViewer(
			{
				path: '/',
				initialDoc: '/book.pdf'
			},
			viewer.current
		).then((instance) => {
			instance.UI.loadDocument
		});
	}, []);

	return (
		<>
			<MetaTags title="CourseStudy" description="CourseStudy page" />
			<NavBar breadcrumbs={[bcMain]} />
			<div className="webviewer" ref={viewer}></div>
		</>
	)
}

export default CourseStudyPage
