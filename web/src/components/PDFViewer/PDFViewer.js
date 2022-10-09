import { useState } from 'react'
import Dropdown from 'src/components/Dropdown'
import {
	getMaterialFiles,
	isPresignedValid,
	updatePresigned,
} from 'src/models/material'
import { useApolloClient } from '@apollo/client'

const PdfViewer = ({ courseId, userId }) => {
	const [bookUrl, setBookUrl] = useState(null)
	const [items, setItems] = useState(null)
	const [files, setFiles] = useState(null)
	const [id, setId] = useState(courseId)
	const [loaded, setLoaded] = useState(false)
	const client = useApolloClient()

	const selectTextbook = async (e) => {
		let file = files.find((file) => file.id == e.target.value)
		if (!isPresignedValid(file)) {
			let file = await updatePresigned(client, userId, courseId, file.id)
		}
		setBookUrl(file.presigned)
	}

	if (!files || id != courseId) {
		getMaterialFiles(client, userId, courseId).then((payload) => {
			if (payload) {
				setFiles(payload)
				setItems(
					payload.map((file) => {
						return { value: file.id, title: file.title }
					})
				)
				if (payload.length) {
					let file = payload[0]
					if (!isPresignedValid(file)) {
						updatePresigned(client, userId, courseId, file.id).then((item) => {
							setBookUrl(item.presigned)
						})
					}
					else {
						setBookUrl(file.presigned)
					}
				}
			} else {
				setFiles([])
			}
			setId(courseId)
		})
	}

	return (
		<div className="mn-flex-column mn-height-full">
			<Dropdown
				className="mn-is-long"
				items={items ? items : []}
				onChange={selectTextbook}
				name="textbook"
				label="Select textbook:"
			/>
			<object
				data={bookUrl}
				className={`${loaded ? 'mn-is-fadein' : 'mn-is-fadeout'} mn-height-full`}
				onLoad={() => setLoaded(true)}
				type="application/pdf"
			></object>
		</div>
	)
}

export default PdfViewer
