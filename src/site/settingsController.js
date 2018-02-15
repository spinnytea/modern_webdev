define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings) {
		$scope.settings = settings;

		$scope.saveTheme = function () {
			localStorageService.set('theme', settings.theme);
		};
	}
});