import { get, set, setMany, update} from 'idb-keyval'

const push = (key, item) => {
	console.log("push db key ", key)
	update(key, (val) => [...val, item])
}

const del = (key, id) => {
	update(key, (data) => data.filter((item) => item.id != id))
}

const find = async (key, id) => {
	const data = get(key)
	return data.find((item) => item.id == id)
}

const updateVal = async (key, id, name, value) => {
	update(key, (data) => data.map(
		(item) => { 
			if (item.id == id) {
				item[name] = value
				return item
			}
			else return item
		}))
}

export const db = {push: push, del: del, find: find, updateVal: updateVal}
