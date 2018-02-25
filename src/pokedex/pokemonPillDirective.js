define(['angular'], function (angular) {
	var pokemonPillMod = angular.module('po_ke_type.types.pokemonPill.directive', []);

	pokemonPillMod.directive('pokemonPill', [PokemonPillDirective]);

	pokemonPillMod.controller('po_ke_type.types.pokemonPill.directive.controller', [
		'$scope', 'localStorageService',
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

	function PokemonPillController($scope, localStorageService) {
		$scope.colorfulCards = localStorageService.get('colorfulCards');
	}
});