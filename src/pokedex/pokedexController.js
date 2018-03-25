define([], function () {
	return [
		'$scope', '$filter', 'po_ke_type.pokedex.factory', 'po_ke_type.site.settings.factory',
		PokedexController,
	];

	function PokedexController($scope, $filter, pokedex, settings) {
		$scope.settings = settings;

		var staticFilteredDex = staticFilter();
		function staticFilter() {
			var list = pokedex.list;
			list = $filter('dexGen')(list);
			list = $filter('orderBy')(list, settings.pokedexOrderBy);
			return list;
		}

		$scope.filteredDex = [];
		$scope.$on('destroy', $scope.$watch('settings.pokedexFilter', dynamicFilter));
		$scope.$on('destroy', $scope.$watch('settings.pokedexLimit', dynamicFilter));
		function dynamicFilter() {
			var list = staticFilteredDex;
			list = $filter(settings.pokedexFilterType)(list, settings.pokedexFilter, 'name');
			list = $filter('limitTo')(list, settings.pokedexLimit);
			$scope.filteredDex = list;
			return list;
		}
	}
});