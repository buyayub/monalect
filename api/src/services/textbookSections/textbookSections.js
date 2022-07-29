import { db } from 'src/lib/db'

export const textbookSections = () => {
  return db.textbookSection.findMany()
}

export const textbookSection = ({ id }) => {
  return db.textbookSection.findUnique({
    where: { id },
  })
}

export const createTextbookSection = ({ input }) => {
  return db.textbookSection.create({
    data: input,
  })
}

export const updateTextbookSection = ({ id, input }) => {
  return db.textbookSection.update({
    data: input,
    where: { id },
  })
}

export const deleteTextbookSection = ({ id }) => {
  return db.textbookSection.delete({
    where: { id },
  })
}

export const TextbookSection = {
  lesson: (_obj, { root }) =>
    db.textbookSection.findUnique({ where: { id: root.id } }).lesson(),
  textbook: (_obj, { root }) =>
    db.textbookSection.findUnique({ where: { id: root.id } }).textbook(),
}
