test('test localStorage', () => {
	// setup
	localStorage.setItem('test', 'value');
	expect(localStorage.getItem('test')).toBe('value');
});
