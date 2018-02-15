define([
	'pokedex/pokedex',
	'site/site',
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