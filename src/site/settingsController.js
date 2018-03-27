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

		$scope.canLoad = true;
		$scope.save = function () {
			// TODO success/error message
			siteIO.save();
		};
		$scope.load = function () {
			// TODO success/error message
			// BUG this doesn't always work the second time, you need to reload before it will work again
			$scope.canLoad = false;
			siteIO.load()
				.then(function (success) { console.log('success!', success); })
				.catch(function (error) { console.log('error!', error); })
				.finally(function () { $scope.canLoad = true; });
		};
	}
});