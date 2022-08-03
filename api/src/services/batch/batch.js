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
					id: material.identifier,
					uploaded: false,
					pages: material.pages,
					author: material.author,
				},
			})

			record.push([
				material.localId,
				textbook.id
			])
		
			//create textbook sections
				
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

	return { id: 5 }
}
