import { useState } from 'react'
import Dropdown from 'src/components/Dropdown'
import {
	getMaterialFiles,
	isPresignedValid,
	updatePresigned,
} from 'src/models/material'
import { useApolloClient } from '@apollo/client'
import { Bars } from 'react-loading-icons'

const PdfViewer = ({ courseId, userId }) => {
	const [bookUrl, setBookUrl] = useState(null)
	const [items, setItems] = useState(null)
	const [files, setFiles] = useState(null)
	const [id, setId] = useState(courseId)
	const [loaded, setLoaded] = useState(false)
	const client = useApolloClient()

	const selectTextbook = async (e) => {
		let filesCopy = JSON.parse(JSON.stringify(files))
		let newFile = filesCopy.find((file) => file.id == parseInt(e.target.value))
		if (!isPresignedValid(newFile)) {
			newFile = await updatePresigned(client, userId, courseId, newFile.id)
			setFiles(filesCopy)
		}
		setBookUrl(newFile.presigned)
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
					} else {
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
			{loaded ? (
				''
			) : (
				<div className="mn-flex-row mn-height-full mn-justify-center mn-align-center">
					<Bars width="60px" fill="#a8c1e9" />
				</div>
			)}
			<object
				data={bookUrl}
				className={`${
					loaded ? 'mn-is-fadein-slow' : 'mn-is-fadeout'
				} mn-height-full`}
				onLoad={() => setLoaded(true)}
				type="application/pdf"
			></object>
		</div>
	)
}

export default PdfViewer
