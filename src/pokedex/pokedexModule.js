define([
	'angular',
	'./bulbapediaDirective',
	'./dexGenFilter',
	'./pokedexController',
	'./pokedexFactory',
	'./pokemonController',
	'./pokemonPillDirective',
	'./teamController',
	'./teamFactory',
], function (angular,
		bulbapediaDirective,
		dexGenFilter,
		pokedexController,
		pokedexFactory,
		pokemonController,
		pokemonPillDirective,
		teamController,
		teamFactory) {
	var pokedexModule = angular.module('po_ke_type.pokedex', []);

	pokedexModule.directive('bulbapedia', bulbapediaDirective);
	pokedexModule.filter('dexGen', dexGenFilter);
	pokedexModule.controller('po_ke_type.pokedex.controller', pokedexController);
	pokedexModule.factory('po_ke_type.pokedex.factory', pokedexFactory);
	pokedexModule.controller('po_ke_type.pokedex.pokemon.controller', pokemonController);
	pokedexModule.directive('pokemonPill', pokemonPillDirective);
	pokedexModule.controller('po_ke_type.pokedex.team.controller', teamController);
	pokedexModule.factory('po_ke_type.pokedex.team.factory', teamFactory);

	return pokedexModule;
});