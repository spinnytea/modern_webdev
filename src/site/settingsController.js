define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings.factory',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings) {
		$scope.settings = settings;

		$scope.save = function (name) {
			localStorageService.set(name, settings[name]);
		};

		$scope.clearLocalStorage = function () {
      return localStorageService.clearAll();
		};
	}
});