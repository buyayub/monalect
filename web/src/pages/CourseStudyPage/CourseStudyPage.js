import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useQuery, Head } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import  QuestionFullForm from 'src/components/QuestionFullForm';
import Modal from 'src/components/Modal'

import CourseNavBar from 'src/components/CourseNavBar'
import { useState } from 'react'
import NotebookCell from 'src/components/NotebookCell'
import PDFviewerCell from 'src/components/PDFviewerCell'

const CourseStudyPage = ({ courseId }) => {
	const { currentUser } = useAuth()
	const [bookUrl, setBookUrl] = useState('')
	const [showForm, setShowForm] = useState(true)

	// load katex in <Head> </Head> 
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.css"
					integrity="sha384-IKOookmJ6jaAbJnGdgrLG5MDmzxJmjkIm6XCFqxnhzuMbfkEhGQalwVq2sYnGyZM"
					crossorigin="anonymous"
				/>
				<script
					defer
					src="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.js"
					integrity="sha384-kSBEBJfG5+zZAKID5uvi6avDXnnOGLnbknFv6VMnVBrknlFw67TwFsY9PaD33zBI"
					crossorigin="anonymous"
				></script>
			</Head>
			<div id="course-study-page">
				<MetaTags title="CourseStudy" description="CourseStudy page" />
				<CourseNavBar courseId={courseId} />
				<main className="mn-padding-page mn-align-stretch mn-gap-medium mn-flex-row mn-grow mn-justify-space-around mn-page-height-100">
					<div className="mn-layout-half">
						<PDFviewerCell
							userId={currentUser.id}
							courseId={parseInt(courseId)}
						/>
					</div>
					<div className="mn-layout-half">
						<NotebookCell
							userId={currentUser.id}
							courseId={parseInt(courseId)}
						/>
					</div>
				</main>
			</div>
			<Modal show={showForm} changeState={() => {setShowForm(!showForm)}}>
				<QuestionFullForm cancel={() => {setShowForm(!showForm)}}courseId={parseInt(courseId)} userId={currentUser.id}/>
			</Modal>
		</>
	)
}

export default CourseStudyPage
