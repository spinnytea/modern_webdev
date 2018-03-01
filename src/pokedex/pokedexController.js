define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.pokedex.factory', 'po_ke_type.site.settings.factory',
		PokedexController,
	];

	function PokedexController($scope, localStorageService, pokedex, settings) {
		$scope.dex = pokedex.list;
		$scope.nested = {
			filter: settings.pokedexFilter,
			limit: 18,
			orderBy: settings.pokedexOrderBy,
		};

		// OPTIMIZE there's got to be a better way to keep settings in sync with local storage
		$scope.updateFilter = function () {
			settings.pokedexFilter = $scope.nested.filter;
			localStorageService.set('pokedexFilter', settings.pokedexFilter);
		};
	}
});