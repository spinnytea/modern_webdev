define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings.factory', 'po_ke_type.pokedex.team.factory',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings, team) {
		$scope.settings = settings;
		$scope.team = team; // TODO button to clear team

		$scope.clearLocalStorage = function () {
			return localStorageService.clearAll();
		};
	}
});