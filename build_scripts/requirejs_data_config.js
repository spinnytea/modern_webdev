'use strict';

/**
 *	@returns the requirejs config object that we use during build:js
 */
module.exports = function () {
	return {
		baseUrl: 'src',
		name: 'dataModule',
		out: 'dist/dataModule.js',
		optimize: 'uglify2',
		generateSourceMaps: false,
		paths: {
			// path expansions
			data: '../static/data',

			// requirejs needs to have the plugins at build time
			json: '../node_modules/requirejs-plugins/src/json',
			text: '../node_modules/requirejs-text/text',
		},
	};
};
