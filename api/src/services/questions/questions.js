import { db } from 'src/lib/db'

export const questions = () => {
  return db.question.findMany()
}

export const question = ({ id }) => {
  return db.question.findUnique({
    where: { id },
  })
}

export const createQuestion = ({ input }) => {
  return db.question.create({
    data: input,
  })
}

export const updateQuestion = ({ id, input }) => {
  return db.question.update({
    data: input,
    where: { id },
  })
}

export const deleteQuestion = ({ id }) => {
  return db.question.delete({
    where: { id },
  })
}

export const Question = {
  answers: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).answers(),
  choices: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).choices(),
}
