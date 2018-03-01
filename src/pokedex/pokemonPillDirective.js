define(['angular'], function (angular) {
	var pokemonPillMod = angular.module('po_ke_type.types.pokemonPill.directive', []);

	pokemonPillMod.directive('pokemonPill', [PokemonPillDirective]);

	pokemonPillMod.controller('po_ke_type.types.pokemonPill.directive.controller', [
		'$scope', 'po_ke_type.site.settings.factory',
		PokemonPillController,
	]);

	return pokemonPillMod;

	function PokemonPillDirective() {
		return {
			restrict: 'A',
			replace: true,
			scope: { mon: '=pokemonPill' },
			templateUrl: 'pokedex/pokemonPillDirective.html',
			controller: 'po_ke_type.types.pokemonPill.directive.controller',
		};
	}

	function PokemonPillController($scope, settings) {
		$scope.settings = settings;
	}
});