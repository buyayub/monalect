import { db } from 'src/lib/db'

export const sectionOnLessons = () => {
	return db.sectionOnLesson.findMany()
}

export const sectionOnLesson = ({ id }) => {
	return db.sectionOnLesson.findUnique({
		where: { id },
	})
}

export const createSectionOnLesson = ({ input }) => {
	return db.sectionOnLesson.create({
		data: input,
	})
}

export const updateSectionOnLesson = ({ id, input }) => {
	return db.sectionOnLesson.update({
		data: input,
		where: { id },
	})
}

export const deleteSectionOnLesson = ({ id }) => {
	return db.sectionOnLesson.delete({
		where: { id },
	})
}

export const SectionOnLesson = {
	lesson: (_obj, { root }) =>
		db.sectionOnLesson.findUnique({ where: { id: root.id } }).lesson(),
	section: (_obj, { root }) =>
		db.sectionOnLesson.findUnique({ where: { id: root.id } }).section(),
}
