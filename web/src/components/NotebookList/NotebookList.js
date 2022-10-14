import NotebookPage from 'src/components/NotebookPage'
import { getPages } from 'src/models/notebook'
import { useState } from 'react'

const NotebookList = ({ courseId, userId }) => {
	const [notebook, setNotebook] = useState(null)
	const [id, setId] = useState(courseId)

	if (!notebook || courseId != id) {
		getPages(courseId).then((data) => {
			setNotebook(data)
			setId(courseId)
		})
	}

	return (
		<div className="mn-flex-column mn-gap-x-large mn-scrollable mn-height-full mn-hide-scrollbar">
			{notebook
				? notebook.map((page, i) => {
						return (
							<NotebookPage
								page={page}
								key={page.id}
								courseId={courseId}
							/>
						)
				  })
				  : ''
			}
		</div>
	)
}

export default NotebookList
