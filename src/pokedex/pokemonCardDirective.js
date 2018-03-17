define(['angular'], function (angular) {
	var pokemonCardMod = angular.module('po_ke_type.types.pokemonCard.directive', []);

	pokemonCardMod.directive('pokemonCard', [PokemonCardDirective]);

	pokemonCardMod.controller('po_ke_type.types.pokemonCard.directive.controller', [
		'$scope', 'po_ke_type.site.settings.factory',
		PokemonCardController,
	]);

	return pokemonCardMod;

	function PokemonCardDirective() {
		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			scope: { mon: '=pokemonCard' },
			templateUrl: 'pokedex/pokemonCardDirective.html',
			controller: 'po_ke_type.types.pokemonCard.directive.controller',
		};
	}

	function PokemonCardController($scope, settings) {
		$scope.settings = settings;
	}
});