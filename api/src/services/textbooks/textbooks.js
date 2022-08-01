import { db } from 'src/lib/db'

export const textbooks = () => {
	return db.textbook.findMany()
}

export const textbook = ({ id }) => {
	return db.textbook.findUnique({
		where: { id },
	})
}

export const createTextbook = ({ input }) => {
	return db.textbook.create({
		data: input,
	})
}

export const updateTextbook = ({ id, input }) => {
	return db.textbook.update({
		data: input,
		where: { id },
	})
}

export const deleteTextbook = ({ id }) => {
	return db.textbook.delete({
		where: { id },
	})
}

export const Textbook = {
	user: (_obj, { root }) =>
		db.textbook.findUnique({ where: { id: root.id } }).user(),
	course: (_obj, { root }) =>
		db.textbook.findUnique({ where: { id: root.id } }).course(),
	sections: (_obj, { root }) =>
		db.textbook.findUnique({ where: { id: root.id } }).sections(),
}
