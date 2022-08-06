import { db } from 'src/lib/db'

export const lessons = async ({courseId, userId}) => {

	let payload = await db.lesson.findMany({where: {
		userId: userId
		}
	});

	// Add linked lessons and sections
	for (let item of payload) {
		item.notebookWords = (await db.notebookPage.aggregate({
			_sum : {
				words: true
			},
			where: {
				lessonId: item.lessonId
			}
		}))._sum.words

		item.questionCount = await db.question.count({
			where: {
				lessonId: item.lessonId
			}
		})

		item.articles = await db.article.findMany({
			where: {
				lessons: {
					some: {
						lessonId: item.id
					}
				}
			}
		})

		item.sections = await db.textbookSection.findMany({
			where: {
				lessons: {
					some: {
						lessonId: item.id
					}
				}
			}
		})
	}
	return payload;
}

export const lesson = ({ id }) => {
	return db.lesson.findUnique({
		where: { id },
	})
}

export const createLesson = ({ input }) => {
	return db.lesson.create({
		data: input,
	})
}

export const updateLesson = ({ id, input }) => {
	return db.lesson.update({
		data: input,
		where: { id },
	})
}

export const deleteLesson = ({ id }) => {
	return db.lesson.delete({
		where: { id },
	})
}

export const Lesson = {
	user: (_obj, { root }) =>
		db.lesson.findUnique({ where: { id: root.id } }).user(),
	course: (_obj, { root }) =>
		db.lesson.findUnique({ where: { id: root.id } }).course(),
	notebookPages: (_obj, { root }) =>
		db.lesson.findUnique({ where: { id: root.id } }).notebookPages(),
	sections: (_obj, { root }) =>
		db.lesson.findUnique({ where: { id: root.id } }).sections(),
	article: (_obj, { root }) =>
		db.lesson.findUnique({ where: { id: root.id } }).article(),
}
