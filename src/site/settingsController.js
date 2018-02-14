define([], function () {
	return [
		'$scope', 'po_ke_type.site.settings', 'po_ke_type.site.themes',
		SettingsController,
	];

	function SettingsController($scope, settings, themes) {
		$scope.settings = settings;
		$scope.themes = themes;

		$scope.saveTheme = function () {
		};
	}
});