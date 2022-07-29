import { db } from 'src/lib/db'

export const choices = () => {
  return db.choice.findMany()
}

export const choice = ({ id }) => {
  return db.choice.findUnique({
    where: { id },
  })
}

export const createChoice = ({ input }) => {
  return db.choice.create({
    data: input,
  })
}

export const updateChoice = ({ id, input }) => {
  return db.choice.update({
    data: input,
    where: { id },
  })
}

export const deleteChoice = ({ id }) => {
  return db.choice.delete({
    where: { id },
  })
}

export const Choice = {
  question: (_obj, { root }) =>
    db.choice.findUnique({ where: { id: root.id } }).question(),
}
