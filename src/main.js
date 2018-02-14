define([
	'site/site',
], function (site) {
	var module = angular.module('po_ke_type', [ 'ngRoute', 'templates', site.name ]);

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', { templateUrl: 'site/home.html' })
			.otherwise({ templateUrl: 'oops.html' });
	}]);

	angular.bootstrap(document, ['po_ke_type']);
	return module;
});