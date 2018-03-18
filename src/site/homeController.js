define([], function () {
	return [
		'$scope',
		'po_ke_type.site.settings.factory',
		'po_ke_type.pokedex.team.factory',
		'po_ke_type.pokedex.factory',
		'po_ke_type.types.factory',
		HomeController,
	];

	function HomeController($scope, settings, team, pokedex, types) {
		$scope.themeCount = settings.themes.length;
		$scope.typeCount = types.list.length;
		$scope.pokedexCount = pokedex.list.length;
		$scope.team = team;
	}
});