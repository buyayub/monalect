import { db } from 'src/lib/db'

export const notebookPages = () => {
  return db.notebookPage.findMany()
}

export const notebookPage = ({ id }) => {
  return db.notebookPage.findUnique({
    where: { id },
  })
}

export const createNotebookPage = ({ input }) => {
  return db.notebookPage.create({
    data: input,
  })
}

export const updateNotebookPage = ({ id, input }) => {
  return db.notebookPage.update({
    data: input,
    where: { id },
  })
}

export const deleteNotebookPage = ({ id }) => {
  return db.notebookPage.delete({
    where: { id },
  })
}

export const NotebookPage = {
  lesson: (_obj, { root }) =>
    db.notebookPage.findUnique({ where: { id: root.id } }).lesson(),
}
