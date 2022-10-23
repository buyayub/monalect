// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
	rootDir: '../',
	preset: '@redwoodjs/testing/config/jest/web',
	setup: '/web/src/lib/testing/setup.js',
	setupFiles: ['fake-indexeddb/auto'],
}

module.exports = config
