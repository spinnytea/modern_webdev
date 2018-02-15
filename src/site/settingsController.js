define(['configPlugins', 'json!data/themes.json'], function (config, themejson) {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings', 'po_ke_type.site.themes',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings, themes) {
		$scope.settings = settings;
		$scope.themes = themes;
		console.log(themes, themejson);

		$scope.saveTheme = function () {
			localStorageService.set('theme', settings.theme);
		};
	}
});