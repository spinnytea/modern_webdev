define(['lodash'], function (_) {
	return [
		'$scope', 'po_ke_type.site.settings', 'po_ke_type.pokedex.pokedexService',
		HomeController,
	];

	function HomeController($scope, settings, pokedexService) {
		$scope.themeCount = settings.themes.length;
		$scope.pokedexCount = pokedexService.pokedex.length;
		$scope.typeCount = _.size(pokedexService.types);
	}
});