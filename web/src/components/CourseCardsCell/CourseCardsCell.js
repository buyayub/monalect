import CourseCard from 'src/components/CourseCard'
import Button from 'src/components/Button'
import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

export const QUERY = gql`
	query CourseCardsQuery($userId: Int!) {
		cards(userId: $userId) {
			id
			title
			notebookWords
			questionCount
			mark
		}
	}
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
	<div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ cards }) => {
	const [edit, setEdit] = useState(false)
	const [cardDisplay, setCardDisplay] = useState(cards)

	const deleteCard = (id) => {
		let newCards = JSON.parse(JSON.stringify(cardDisplay))
		setCardDisplay([
			...newCards.filter((card) => {
				return card.id != id
			}),
		])
	}

	return (
		<div className="mn-flex-column mn-gap-medium mn-height-full">
			<div className="mn-flex-row mn-justify-space-between">
				<h2>Courses</h2>
				{edit ? (
					<Button className="mn-is-secondary" onClick={() => setEdit(false)}>
						{' '}
						Exit{' '}
					</Button>
				) : (
					<div className="mn-flex-row mn-gap-medium">
						<Button className="mn-is-secondary" onClick={() => setEdit(true)}> Edit </Button>
						<Link to={routes.createCourse()}>
							{' '}
							<Button> Create </Button>
						</Link>
					</div>
				)}
			</div>
			<div className="mn-scrollable mn-height-full">
				<div className="mn-flex-column mn-gap-medium mn-padding-right-small">
					{cardDisplay.map((item) => {
						console.log(item)
						return (
							<CourseCard
								courseId={item.id}
								courseTitle={
									item.title !== '' && item.title != null
										? item.title
										: 'Untitled'
								}
								notebookWords={item.notebookWords}
								questionCount={item.questionCount}
								mark={item.mark}
								edit={edit}
								handleDelete={deleteCard}
								key={item.id}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
