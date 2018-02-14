define([], function () {
	return [
		'$scope', 'po_ke_type.site.settings',
		HeadController,
	];

	function HeadController($scope, settings) {
		$scope.settings = settings;
	}
});