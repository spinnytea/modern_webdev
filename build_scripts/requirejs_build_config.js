'use strict';

/**
 * @param {*} minify should we minify the result
 *	@returns sthe requirejs config object that we use during build:js
 */
module.exports = function (minify) {
	return {
		baseUrl: 'src',
		name: 'main',
		out: 'dist/main.js',
		optimize: (minify ? 'uglify2' : 'none'),
		generateSourceMaps: !!minify,
		paths: {
			// path expansions
			data: '../static/data',

			// we can ignore vendor deps during build
			angular: 'empty:',
			jquery: 'empty:',
			lodash: 'empty:',

			// requirejs needs to have the plugins at build time
			json: '../node_modules/requirejs-plugins/src/json',
			text: '../node_modules/requirejs-text/text',
		},
		exclude: [
			// exlcude data files
			'json!data/pokedex.json',
			'json!data/themes.json',
			'json!data/types.json',
		],
	};
};
