define([], function () {
	return [PokemonPillDirective];

	function PokemonPillDirective() {
		return {
			restrict: 'A',
			replace: true,
			scope: { mon: '=pokemonPill' },
			templateUrl: 'pokedex/pokemonPillDirective.html',
			controller: ['$scope', 'localStorageService', PokemonPillController],
		};
	}

	function PokemonPillController($scope, localStorageService) {
		$scope.colorfulCards = localStorageService.get('colorfulCards');
	}
});