define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.siteIO.factory',
		'po_ke_type.site.settings.factory', 'po_ke_type.pokedex.team.factory',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, siteIO,
			settings, team) {
		$scope.settings = settings;
		$scope.team = team;

		$scope.clearTeam = function () {
			team.splice(0);
		};

		$scope.clearLocalStorage = function () {
			return localStorageService.clearAll();
		};

		$scope.save = function () {
			// TODO success/error message
			siteIO.save();
		};
	}
});