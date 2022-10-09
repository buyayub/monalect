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
		setBookUrl(e.target.value)
	}

	return (
		<div className="mn-flex-column mn-height-full">
			<Dropdown
				className="mn-is-long"
				items={items}
				onChange={selectTextbook}
				name="textbook"
				label="Select textbook:"
				selected={selected}
			/>
			<object
				data={bookUrl}
				className="mn-height-full"
				type="application/pdf"
			></object>
		</div>
	)
}
