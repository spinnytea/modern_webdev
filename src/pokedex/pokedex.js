define([
	'angular',
	'./pokedexService',
], function (angular, pokedexService) {
	var module = angular.module('po_ke_type.pokedex', []);

	module.service('po_ke_type.pokedex.pokedexService', pokedexService);

	return module;
});