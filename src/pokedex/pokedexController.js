define([], function () {
	return [
		'$scope', 'po_ke_type.pokedex.factory', 'po_ke_type.site.settings.factory',
		PokedexController,
	];

	function PokedexController($scope, pokedex, settings) {
		$scope.dex = pokedex.list;
		$scope.settings = settings;
	}
});