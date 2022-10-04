import CourseCard from 'src/components/CourseCard'
import Button from 'src/components/Button'
import { Link, routes } from '@redwoodjs/router'
import { useState, useEffect} from 'react'
import { getCourseCards } from 'src/models/courseCard'

const CourseCardList = ({userId}) => {
	const [cards, setCards] = useState(null)
	const [edit, setEdit] = useState(false)

	useEffect(() => {
		if (!cards) {
			getCourseCards().then((data) => setCards(data))
		}
	})

	/*
	const deleteCard = (id) => {
		let newCards = JSON.parse(JSON.stringify(cardDisplay))
		setCardDisplay([
			...newCards.filter((card) => {
				return card.id != id
			}),
		])
	}
	*/

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
						<Button className="mn-is-secondary" onClick={() => setEdit(true)}>
							{' '}
							Edit{' '}
						</Button>
						<Link to={routes.createCourse()}>
							{' '}
							<Button> Create </Button>
						</Link>
					</div>
				)}
			</div>
			<div className="mn-scrollable mn-height-full">
				<div className="mn-flex-column mn-gap-medium mn-padding-right-small">
					{cards ? cards.map((item) => {
						return (
							<CourseCard
								courseId={item.id}
								courseTitle={
									item.title !== '' && item.title != null
										? item.title
										: 'Untitled'
								}
								notebookWords={item.notebookWords ? item.notebookWords : 0}
								questionCount={item.questionCount}
								mark={item.mark}
								edit={edit}
								handleDelete={() => console.log("delete")}
								key={item.id}
								courseDescription={item.description}
								lessons={item.lessonCount}
							/>
						)
					}): "loading..."}
				</div>
			</div>
		</div>
	)
}

export default CourseCardList
