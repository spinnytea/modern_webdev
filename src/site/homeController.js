define(['lodash'], function (_) {
	return [
		'$scope', 'po_ke_type.site.settings.factory', 'po_ke_type.pokedex.team.factory', 'po_ke_type.pokedex.pokedexService',
		HomeController,
	];

	function HomeController($scope, settings, team, pokedexService) {
		$scope.themeCount = settings.themes.length;
		$scope.pokedexCount = pokedexService.pokedex.length;
		$scope.typeCount = _.size(pokedexService.types);
		$scope.team = team;
	}
});