define([], function () {
	return [
		'$scope', 'po_ke_type.pokedex.factory',
		PokedexController,
	];

	// TODO save filter string in local storage
	// TODO sort order
	// TODO change limits (multiples of 6)
	function PokedexController($scope, pokedex) {
		$scope.dex = pokedex.list;
		$scope.nested = { filter: '', limit: 20 };
	}
});