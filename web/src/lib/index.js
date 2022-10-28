import { api } from 'src/lib/api'
import { db } from 'src/lib/db'
import { cache } from 'src/lib/cache'

export {api, db, cache}

// recursively iteratures over an object and applies a function to it
// also traverses arrays in that object
export const iterateObject = (obj, func) => {
	if (typeof obj == 'object') {
		for (let item in obj) {
			if (typeof obj[item] == 'object' || Array.isArray(obj[item])) {
				iterateObject(obj[item], func)
			} else if (func) {
				func(obj, item)
			}
		}
	} else if (Array.isArray(obj)) {
		for (let item of obj) {
			if (typeof item == 'object' || Array.isArray(item)) {
				iterateObject(item, func)
			} else if (func) {
				func(item)
			}
		}
	}
}

