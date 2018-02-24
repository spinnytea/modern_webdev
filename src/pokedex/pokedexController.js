define([], function () {
	return [
		'$scope', 'po_ke_type.pokedex.factory',
		PokedexController,
	];

	// TODO save filter in local storage
	function PokedexController($scope, pokedex) {
		$scope.dex = pokedex.list;
		$scope.nested = { filter: '', limit: 20 };
	}
});