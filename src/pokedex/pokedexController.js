define([], function () {
	return [
		'$scope', 'po_ke_type.pokedex.factory',
		PokedexController,
	];

	function PokedexController($scope, pokedex) {
		$scope.dex = pokedex.list;
		$scope.nested = { filter: '', limit: 20 };
	}
});