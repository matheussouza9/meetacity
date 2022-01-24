import adapter from '@sveltejs/adapter-auto'
// const pkg = require('./package.json')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
