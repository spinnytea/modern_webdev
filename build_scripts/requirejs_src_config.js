'use strict';

/**
 * This is the build-time config.
 * External libraries should be excluded so we can load them at runtime.
 *
 * @param {Boolean} minify - should we minify the result
 *	@returns the requirejs config object that we use during build:js
 */
module.exports = function (minify) {
	return {
		baseUrl: 'src',
		name: 'mainModule',
		out: 'dist/mainModule.js',
		optimize: (minify ? 'uglify2' : 'none'),
		generateSourceMaps: !!minify,
		paths: {
			// path expansions
			data: '../static/data',

			// we can ignore vendor deps during build
			angular: 'empty:',
			bluebird: 'empty:',
			fuzzysearch: 'empty:',
			jquery: 'empty:',
			lodash: 'empty:',
			moment: 'empty:',

			// requirejs needs to have the plugins at build time
			json: '../node_modules/requirejs-plugins/src/json',
			text: '../node_modules/requirejs-text/text',
		},
		exclude: [
			'./dataModule',
			// exlcude data files
			'json!data/pokedex.json',
			'json!data/themes.json',
			'json!data/types.json',
		],
	};
};
