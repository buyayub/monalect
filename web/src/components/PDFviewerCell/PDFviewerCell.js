import { useState } from 'react'
import Dropdown from 'src/components/Dropdown'

export const QUERY = gql`
	query GetTheTextbooks($userId: Int!, $courseId: Int!) {
		textbooks(userId: $userId, courseId: $courseId) {
			id
			url
			presigned
			title
		}
	}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
	<div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ textbooks }) => {
	const [bookUrl, setBookUrl] = useState(textbooks[0].presigned)

	let items = []
	let selected = textbooks[0].presigned

	for (const book of textbooks) {
		items.push({
			title: book.title,
			value: book.presigned,
		})
	}

	const selectTextbook = (e) => {
		console.log(e.target.value)
		setBookUrl(e.target.value)
	}

	return (
		<div className="mn-c-pdf-viewer">
			<Dropdown
				items={items}
				onChange={selectTextbook}
				name="textbook"
				label="Select textbook:"
				selected={selected}
			/>
			<object
				data={bookUrl}
				type="application/pdf"
				className="webviewer"
			></object>
		</div>
	)
}
