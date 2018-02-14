define([
	'site/site',
], function (site) {
	var module = angular.module('po_ke_type', [ 'ngRoute', 'templates', site.name ]);

	module.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', { templateUrl: 'site/home.html' })
			.when('/settings', { templateUrl: 'site/settings.html', controller: 'po_ke_type.site.settings.controller' })
			.otherwise({ templateUrl: 'oops.html' });
	}]);

	angular.bootstrap(document, ['po_ke_type']);
	return module;
});