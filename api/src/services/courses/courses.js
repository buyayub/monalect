import { db } from 'src/lib/db'

export const courses = () => {
  return db.course.findMany()
}

export const course = ({ id }) => {
  return db.course.findUnique({
    where: { id },
  })
}

export const createCourse = ({ input }) => {
  return db.course.create({
    data: input,
  })
}

export const updateCourse = ({ id, input }) => {
  return db.course.update({
    data: input,
    where: { id },
  })
}

export const deleteCourse = ({ id }) => {
  return db.course.delete({
    where: { id },
  })
}

export const Course = {
  user: (_obj, { root }) =>
    db.course.findUnique({ where: { id: root.id } }).user(),
  textbooks: (_obj, { root }) =>
    db.course.findUnique({ where: { id: root.id } }).textbooks(),
  articles: (_obj, { root }) =>
    db.course.findUnique({ where: { id: root.id } }).articles(),
  goals: (_obj, { root }) =>
    db.course.findUnique({ where: { id: root.id } }).goals(),
}
