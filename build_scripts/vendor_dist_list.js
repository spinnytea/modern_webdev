'use strict';

/**
 * @returns the list of files that need to be copied from node_modules to dist vendor
 *   ['dist folder', 'node_modules glob']
 */
module.exports = function () {
	return [
		['angular', 'node_modules/angular/angular.min.js'],
		['angular', 'node_modules/angular-animate/angular-animate.min.js'],
		['angular', 'node_modules/angular-local-storage/dist/angular-local-storage.min.js'],
		['angular', 'node_modules/angular-hotkeys/build/*.min.*'],
		['angular', 'node_modules/angular-route/angular-route.min.js'],
		['angular', 'node_modules/angular-sanitize/angular-sanitize.min.js'],
		['bootstrap', 'node_modules/bootstrap/dist/js/bootstrap.min.js'],
		['bootstrap/fonts', 'node_modules/bootstrap/dist/fonts/*'],
		['bootstrap', 'node_modules/bootswatch/*/bootstrap.min.css'],
		['bootstrap/default', 'node_modules/bootstrap/dist/css/bootstrap.min.css'],
		['bootstrap', 'node_modules/bootstrap-tour/build/js/bootstrap-tour.min.js'],
		['bootstrap', 'node_modules/bootstrap-tour/build/css/bootstrap-tour.min.css'],
		['font-awesome/css', 'node_modules/font-awesome/css/*'],
		['font-awesome/fonts', 'node_modules/font-awesome/fonts/*'],
		['.', 'node_modules/jquery/dist/jquery.min.js'],
		['.', 'node_modules/lodash/lodash.min.js'],
		['requirejs', 'node_modules/requirejs/require.js'],
		['requirejs', 'node_modules/requirejs-plugins/src/*'],
		['requirejs', 'node_modules/requirejs-text/text.js'],
		['requirejs', 'node_modules/requirejs-plugins/lib/Markdown.Converter.js'],
	];
};
