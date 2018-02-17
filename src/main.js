require.config({
	paths : {
		// create alias to plugins (not needed if plugins are on the baseUrl)
		async: 'vendor/requirejs/async',
		font: 'vendor/requirejs/font',
		goog: 'vendor/requirejs/goog',
		image: 'vendor/requirejs/image',
		json: 'vendor/requirejs/json',
		noext: 'vendor/requirejs/noext',
		mdown: 'vendor/requirejs/mdown',
		propertyParser : 'vendor/requirejs/propertyParser',
		text: 'vendor/requirejs/text',
		markdownConverter : 'vendor/requirejs/Markdown.Converter',
	},
});

define([
	'./pokedex/pokedex',
	'./site/site',
], function (pokedex, site) {
	var module = angular.module('po_ke_type', [
		pokedex.name,
		site.name,
		'templates',
		'LocalStorageModule',
		'ngRoute',
	]);

	module.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', { templateUrl: 'site/home.html', controller: 'po_ke_type.site.home.controller' })
			.when('/settings', { templateUrl: 'site/settings.html', controller: 'po_ke_type.site.settings.controller' })
			.otherwise({ templateUrl: 'oops.html' });
	}]);

	module.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('po_ke_type')
			.setNotify(false, true); // setItem: false, removeItem: true
	}]);

	angular.bootstrap(document, ['po_ke_type']);
	return module;
});