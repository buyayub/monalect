import { SAVE_PAGE } from 'src/queries/notebook'

export const updatePage = async (client, userId, input) => {
	const payload = {
		words: input.words,
		content: input.content
	}

	client.mutate({
		mutation: SAVE_PAGE,
		variables: {
			id: input.id,
			userId: userId,
			input: payload
		}})
}
