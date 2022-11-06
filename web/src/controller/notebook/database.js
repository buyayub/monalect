import { db } from 'src/lib/db'

export const updatePage = async (input) => {
	// 	input: id, content, words, lessonId

	if(input.content) db.updateVal('notebookPage', input.id, 'content', input.content)
	if(input.words) db.updateVal('notebookPage', input.id, 'words', input.words)
}
