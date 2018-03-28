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
			// no need for any messages
			// the browser will initiate the download and that will be our feedback
			// there's no way to listen for failures anyway, it sort of just happens
			siteIO.save();
		};
		$scope.load = function () {
			// TODO success/error message
			// BUG this doesn't always work the second time, you need to reload before it will work again
			siteIO.load()
				.then(function (success) { console.log('success!', success); })
				.catch(function (error) { console.log('error!', error); });
		};
	}
});