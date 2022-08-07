import { db } from 'src/lib/db'
import {isOwner} from 'src/lib/auth'

export const lessons = async ({courseId, userId}) => {
	isOwner(userId)

	let payload = await db.lesson.findMany({where: {
		courseId: courseId,
		userId: userId
		}
	});

	// Add linked lessons and sections
	for (let item of payload) {
		isOwner(item.userId)
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

