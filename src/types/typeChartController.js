define(['lodash'], function (_) {
	return [
		'$scope', 'po_ke_type.site.settings', 'po_ke_type.types.factory',
		TypeChartController,
	];

	function TypeChartController($scope, settings, types) {
		pickChart(settings.preferredTypeChart);
		$scope.availableTypeCharts = settings.availableTypeCharts;
		$scope.types = types;
		$scope.text = types.text;

		$scope.pickChart = pickChart;
		function pickChart(typeChart) {
			$scope.chartName = _.find(settings.availableTypeCharts, { id: typeChart }).display;
			$scope.whichChart = typeChart;
		}
	}
});