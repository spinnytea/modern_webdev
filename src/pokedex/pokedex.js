define([
	'angular',
	'./dexGenFilter',
	'./pokedexFactory',
	'./pokedexService',
	'./pokemonPillDirective',
	'./teamController',
	'./teamFactory',
], function (angular,
		dexGenFilter,
		pokedexFactory,
		pokedexService,
		pokemonPillDirective,
		teamController,
		teamFactory) {
	var module = angular.module('po_ke_type.pokedex', []);

	module.filter('dexGen', dexGenFilter);
	module.factory('po_ke_type.pokedex.factory', pokedexFactory);
	module.service('po_ke_type.pokedex.pokedexService', pokedexService);
	module.directive('pokemonPill', pokemonPillDirective);
	module.controller('po_ke_type.pokedex.team.controller', teamController);
	module.factory('po_ke_type.pokedex.team.factory', teamFactory);

	return module;
});