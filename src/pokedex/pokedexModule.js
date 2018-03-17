define([
	'angular',
	'./bulbapediaDirective',
	'./dexGenFilter',
	'./pokedexController',
	'./pokedexFactory',
	'./pokemonCardDirective',
	'./pokemonController',
	'./pokemonPillDirective',
	'./teamController',
	'./teamFactory',
], function (
	angular,
	bulbapediaDirective,
	dexGenFilter,
	pokedexController,
	pokedexFactory,
	pokemonCardDirective,
	pokemonController,
	pokemonPillDirective,
	teamController,
	teamFactory
) {
	var pokedexModule = angular.module('po_ke_type.pokedex', [
		bulbapediaDirective.name,
		pokemonCardDirective.name,
		pokemonPillDirective.name,
		'ngAnimate',
	]);

	pokedexModule.filter('dexGen', dexGenFilter);
	pokedexModule.controller('po_ke_type.pokedex.controller', pokedexController);
	pokedexModule.factory('po_ke_type.pokedex.factory', pokedexFactory);
	pokedexModule.controller('po_ke_type.pokedex.pokemon.controller', pokemonController);
	pokedexModule.controller('po_ke_type.pokedex.team.controller', teamController);
	pokedexModule.factory('po_ke_type.pokedex.team.factory', teamFactory);

	return pokedexModule;
});