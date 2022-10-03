import { get, set, getAll, entries } from 'idb-keyval'
import { useMemo, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { GET_COURSE_CARDS } from 'src/shared/queries'
import { useAuth } from '@redwoodjs/auth'

export default function Database({ children }) {
	const { currentUser } = useAuth()
	const client = useApolloClient()

	if (currentUser && client) {initDB(client, currentUser)}

	entries().then((entries) => console.log(entries));
	return <>{children}</>
}

const initDB = async (client, currentUser) => {
}
