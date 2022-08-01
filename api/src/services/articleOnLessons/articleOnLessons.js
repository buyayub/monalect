import { db } from 'src/lib/db'

export const articleOnLessons = () => {
	return db.articleOnLesson.findMany()
}

export const articleOnLesson = ({ id }) => {
	return db.articleOnLesson.findUnique({
		where: { id },
	})
}

export const createArticleOnLesson = ({ input }) => {
	return db.articleOnLesson.create({
		data: input,
	})
}

export const updateArticleOnLesson = ({ id, input }) => {
	return db.articleOnLesson.update({
		data: input,
		where: { id },
	})
}

export const deleteArticleOnLesson = ({ id }) => {
	return db.articleOnLesson.delete({
		where: { id },
	})
}

export const ArticleOnLesson = {
	lesson: (_obj, { root }) =>
		db.articleOnLesson.findUnique({ where: { id: root.id } }).lesson(),
	article: (_obj, { root }) =>
		db.articleOnLesson.findUnique({ where: { id: root.id } }).article(),
}
