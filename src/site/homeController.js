define([], function () {
	return [
		'$scope',
		'po_ke_type.site.settings.factory',
		'po_ke_type.pokedex.team.factory',
		'po_ke_type.pokedex.factory',
		'po_ke_type.types.factory',
		'po_ke_type.utils.tours.factory',
		HomeController,
	];

	function HomeController($scope, settings, team, pokedex, types, tours) {
		$scope.themeCount = settings.themes.length;
		$scope.pokedexCount = pokedex.list.length;
		$scope.typeCount = types.list.length;
		$scope.team = team;

		tours.register({
			name: 'homeIntro',
			title: 'My First Tour',
			steps: [{
				element: '[ng-bind="themeCount"]',
				content: 'Well... this is awkard',
			}, {
				element: '[ng-bind="pokedexCount"]',
				content: 'At least we got them all',
			}],
		});

		$scope.doTour = function () {
			tours.start('homeIntro');
		};
	}
});