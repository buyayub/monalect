import { cache } from 'src/lib/cache';

afterEach(() => {
	localStorage.clear()
	sessionStorage.clear()
});

test('cache library set and get', () => {
	let test1 = 1
	let test2 = [1, 2]
	let test3 = { prop1: 1, prop2: 2}
	let test4 = NaN
	let test5 = null 

	cache.set('test1', test1)
	cache.set('test2', test2)
	cache.set('test3', test3)
	cache.set('test4', test4)
	cache.set('test5', test5)

	expect(cache.get('test1')).toStrictEqual(test1)
	expect(cache.get('test2')).toStrictEqual(test2)
	expect(cache.get('test3')).toStrictEqual(test3)
	expect(cache.get('test4')).toStrictEqual(null)
	expect(cache.get('test5')).toStrictEqual(null)
});

