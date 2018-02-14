define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings', 'po_ke_type.site.themes',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings, themes) {
		$scope.settings = settings;
		$scope.themes = themes;

		$scope.saveTheme = function () {
			localStorageService.set('theme', settings.theme);
		};
	}
});