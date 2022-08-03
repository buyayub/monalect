import { db } from 'src/lib/db'

export const createBatchCourse = async ({ input }) => {
	console.log(JSON.stringify(input, null, 4))
	let record = []

	const course = await db.course.create({
		data: {
			userId: input.userId,
			title: input.title,
		},
	})

	for (material of input.material) {
		if (material.type == 'textbook') {
			console.log('textbook created')
			const textbook = await db.textbook.create({
				data: {
					userId: input.userId,
					courseId: course.id,
					title: material.title,
					isbn: material.identifier,
					//uploaded: false,
					pages: material.pages,
					author: material.author,
				},
			})

			record.push([material.localId, textbook.id])

			//create textbook sections

			for (section of material.sections) {
				const textbookSection = await db.textbookSection.create({
					data: {
						userId: input.userId,
						textbookId: textbook.id,
						title: section.title,
						start: section.start,
						end: section.end,
					},
				})
				record.push([section.localId, textbookSection.id])
			}
		} else if (material.type == 'article') {
			const article = await db.article.create({
				data: {
					userId: input.userId,
					courseId: course.id,
					title: material.title,
					doi: material.identifier,
					uploaded: false,
					pages: material.pages,
					author: material.author,
				},
			})
			record.push([material.localId, article.id])
		}
	}

	// Create lessons
	
	for (lesson of input.lesson)
	{
		let newLesson = await db.lesson.create({
			data: {
				userId: input.userId,
				courseId: course.id,
				title: lesson.title
			}
		})

		record.push([lesson.localId, newLesson.id])
	}
	

	// Create many-to-many relations
	// We first check the type of the relation, if it's an article, we create an ArticleOnLesson object, otherwise SectionOnLesson

	const findType = (material, localId) => {
		for (const material of input.material) {
			if (localId == material.localId) {
				return material.type
			}

			for (const section of material.sections) {
				if (localId == section.localId) {
					return 'section'
				}
			}
		}
	}

	const findRealId = (localId) => {
		for (const entry of record) {
			if (localId == entry[0]) {
				return entry[1]
			}
		}
		return null
	}

	for (lesson of input.lesson) {
		for (link of lesson.material) {
			// search through material for local id
			let linkType = findType(input.material, link)
			if (linkType == 'article') {
				let articleId = findRealId(link)
				let lessonId = findRealId(lesson.localId)
				await db.articleOnLesson.create({
					data: {
						lessonId: lessonId,
						articleId: articleId,
					},
				})
			}
			else if (linkType == 'section') {
				let sectionId = findRealId(link)
				let lessonId = findRealId(lesson.localId)
				await db.sectionOnLesson.create({
					data: {
						lessonId: lessonId,
						sectionId: sectionId,
					},
				})
			}
		}
	}

	return { id: course.id }
}
