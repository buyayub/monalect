import { db } from 'src/lib/db'
import { isOwner } from 'src/lib/auth'

export const createTest = ({userId, input}) => {
	isOwner(userId)
	return null
}

