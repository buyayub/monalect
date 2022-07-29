import { db } from 'src/lib/db'

export const lessons = () => {
  return db.lesson.findMany()
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
  articles: (_obj, { root }) =>
    db.lesson.findUnique({ where: { id: root.id } }).articles(),
  sections: (_obj, { root }) =>
    db.lesson.findUnique({ where: { id: root.id } }).sections(),
  notebookPages: (_obj, { root }) =>
    db.lesson.findUnique({ where: { id: root.id } }).notebookPages(),
}
