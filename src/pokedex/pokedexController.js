define([], function () {
	return [
		'$scope', 'po_ke_type.pokedex.factory', 'po_ke_type.site.settings.factory',
		PokedexController,
	];

	// TODO save filter string in local storage
	function PokedexController($scope, pokedex, settings) {
		$scope.dex = pokedex.list;
		$scope.nested = {
			filter: '',
			limit: 18,
			orderBy: settings.pokedexOrderBy,
		};
	}
});