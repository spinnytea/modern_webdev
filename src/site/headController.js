define([], function () {
	return [
		'$scope', 'po_ke_type.site.defaultTheme',
		HeadController,
	];

	function HeadController($scope, defaultTheme) {
		$scope.theme = defaultTheme;
	}
});