define(['configPlugins', 'json!data/themes.json'], function (config, themes) {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings) {
		$scope.settings = settings;
		$scope.themes = themes;

		$scope.saveTheme = function () {
			localStorageService.set('theme', settings.theme);
		};
	}
});