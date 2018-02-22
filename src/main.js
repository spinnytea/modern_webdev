// HACK define modules for dependencies loaded on page
// - requirejs refuses to not load a module
// - angular needs to be on the page before we start
// - shim does is a wrapper around modules
// - exclude does not prevent require from trying to load them
define('angular', function () { return angular; }); // eslint-disable-line
define('lodash', function () { return _; }); // eslint-disable-line

require.config({
	paths: {
		// create alias to requirejs plugins
		json: 'vendor/requirejs/json',
		text: 'vendor/requirejs/text',
	},
});

// eslint-disable-next-line requirejs/no-multiple-define
define([
	'angular',
	'./pokedex/pokedex',
	'./site/site',
	'./types/types',
	'./utils',
], function (angular, pokedex, site, types, utils) {
	var module = angular.module('po_ke_type', [
		pokedex.name,
		site.name,
		types.name,
		utils.name,
		'templates',
		'LocalStorageModule',
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
	]);

	module.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', { templateUrl: 'site/home.html', controller: 'po_ke_type.site.home.controller' })
			.when('/types', { templateUrl: 'types/types.html', controller: 'po_ke_type.types.controller' })
			.when('/pokedex', { templateUrl: 'pokedex/pokedex.html', controller: 'po_ke_type.pokedex.controller' })
			.when('/pokedex/:name/:specialname?', { templateUrl: 'pokedex/pokemon.html', controller: 'po_ke_type.pokedex.pokemon.controller' })
			.when('/team', { templateUrl: 'pokedex/team.html', controller: 'po_ke_type.pokedex.team.controller' })
			.when('/settings', { templateUrl: 'site/settings.html', controller: 'po_ke_type.site.settings.controller' })
			.otherwise({ templateUrl: 'site/oops.html' });
	}]);

	module.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
		localStorageServiceProvider
			.setPrefix('po_ke_type')
			.setNotify(false, true); // setItem: false, removeItem: true
	}]);

	module.constant('po_ke_type.defaults.theme', 'spacelab');
	module.constant('po_ke_type.defaults.preferredTypeChart', 'squares');
	module.constant('po_ke_type.defaults.dexGen', '6');
	module.constant('po_ke_type.defaults.colorfulCards', false);

	angular.bootstrap(document, ['po_ke_type']);
	return module;
});