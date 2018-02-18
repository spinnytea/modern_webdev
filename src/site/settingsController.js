define([], function () {
	return [
		'$scope', 'localStorageService', 'po_ke_type.site.settings',
		SettingsController,
	];

	function SettingsController($scope, localStorageService, settings) {
		$scope.settings = settings;

		$scope.save = {};

		$scope.save.theme = function () {
			localStorageService.set('theme', settings.theme);
		};
		$scope.save.preferredTypeChart = function () {
			localStorageService.set('preferredTypeChart', settings.preferredTypeChart);
		};
	}
});