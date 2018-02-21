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
	var module = angular.module('po_ke_type.pokedex', []);

	module.filter('dexGen', dexGenFilter);
	module.controller('po_ke_type.pokedex.controller', pokedexController);
	module.factory('po_ke_type.pokedex.factory', pokedexFactory);
	module.service('po_ke_type.pokedex.pokedexService', pokedexService);
	module.controller('po_ke_type.pokedex.pokemon.controller', pokemonController);
	module.directive('pokemonPill', pokemonPillDirective);
	module.controller('po_ke_type.pokedex.team.controller', teamController);
	module.factory('po_ke_type.pokedex.team.factory', teamFactory);

	module.directive('bulbapedia', [function BulbapediaDirective() {
		return {
			restrict: 'A',
			replace: 'true',
			scope: { mon: '=bulbapedia' },
			template: '<a ng-href="http://bulbapedia.bulbagarden.net/wiki/{{mon.name}}_(Pok%C3%A9mon)" target="bulbapedia"><i class="fa fa-external-link"></i></a>',
		};
	}]);

	return module;
});