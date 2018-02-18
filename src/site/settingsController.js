define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings) {
		$scope.settings = settings;

		$scope.save = function (name) {
			localStorageService.set(name, settings[name]);
		};
	}
});