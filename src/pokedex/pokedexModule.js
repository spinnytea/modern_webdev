define([
	'angular',
	'./dexGenFilter',
	'./pokedexController',
	'./pokedexFactory',
	'./pokedexService',
	'./pokemonController',
	'./pokemonPillDirective',
	'./teamController',
	'./teamFactory',
], function (angular,
		dexGenFilter,
		pokedexController,
		pokedexFactory,
		pokedexService,
		pokemonController,
		pokemonPillDirective,
		teamController,
		teamFactory) {
	var pokedexModule = angular.module('po_ke_type.pokedex', []);

	pokedexModule.filter('dexGen', dexGenFilter);
	pokedexModule.controller('po_ke_type.pokedex.controller', pokedexController);
	pokedexModule.factory('po_ke_type.pokedex.factory', pokedexFactory);
	pokedexModule.service('po_ke_type.pokedex.pokedexService', pokedexService);
	pokedexModule.controller('po_ke_type.pokedex.pokemon.controller', pokemonController);
	pokedexModule.directive('pokemonPill', pokemonPillDirective);
	pokedexModule.controller('po_ke_type.pokedex.team.controller', teamController);
	pokedexModule.factory('po_ke_type.pokedex.team.factory', teamFactory);

	pokedexModule.directive('bulbapedia', [function BulbapediaDirective() {
		return {
			restrict: 'A',
			replace: 'true',
			scope: { mon: '=bulbapedia' },
			template: '<a ng-href="http://bulbapedia.bulbagarden.net/wiki/{{mon.name}}_(Pok%C3%A9mon)" target="bulbapedia"><i class="fa fa-external-link"></i></a>',
		};
	}]);

	return pokedexModule;
});