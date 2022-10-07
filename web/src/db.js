import { get, set, setMany, values } from 'idb-keyval'
import { useMemo, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { GET_ALL } from 'src/shared/queries/'

export default function Database({ children }) {
	const { currentUser } = useAuth()
	const client = useApolloClient()

	const synced = localStorage.getItem('synced')
	// sync database if it's undefined
	if (currentUser && client && synced === null) {
		syncDB(client, currentUser.id)
	}


	return <>{children}</>
}


const syncDB = async (client, userId) => {
	client
		.query({
			query: GET_ALL,
			variables: { userId: userId },
		})
		.then((response) => {
			const data = response.data.all
			const propNames = Object.keys(data)
			const values = Object.values(data)

			let ugh = []
			// start at 1 to remove __typename, not going to deal with apollo configuration
			for (let i = 1; i < propNames.length; i++) {
				ugh.push([propNames[i], values[i]])
			}

			setMany(ugh)
				.then(() => {
					localStorage.setItem('synced', true)
					setUniqueId()
				})
				.catch((err) => console.error(err))
		})
		.catch((err) => console.error(err))
}

const syncItem = async (client, userId, item) => {
	try {
		const response = await client.query({
			query: item.query,
			variables: { userId: userId },
		})
		const data = response.data[item.queryName]
		set(item.name, data)
	} catch (err) {
		console.error(err)
	}
}

export const setUniqueId = async () => {
	const stuff = await values()
	let ids = []
	for (const val of stuff) {
		if (val.length > 0) {
			val.forEach((item) => ids.push(item.id))
		}
	}
	console.log(ids)
	const max = Math.max(...ids)
	localStorage.setItem('unique-id', JSON.stringify(max))
	sessionStorage.setItem('unique-id', JSON.stringify(max))
}
