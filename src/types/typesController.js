define(['lodash'], function (_) {
	return [
		'$scope', 'po_ke_type.site.settings', 'po_ke_type.types.factory',
		TypesController,
	];

	function TypesController($scope, settings, types) {
		pickChart(settings.preferredTypeChart);
		$scope.types = types;
		$scope.availableTypeCharts = settings.availableTypeCharts;

		// prep text labels for type charts
		// XXX does this need to be in a central place?
		$scope.text = types.list.reduce(function (ret, type) {
			ret[type] = {
				name: _.capitalize(type),
				title: _.toUpper(type.substr(0,3)),
			};
			return ret;
		}, {});

		$scope.pickChart = pickChart;
		function pickChart(typeChart) {
			$scope.chartName = _.find(settings.availableTypeCharts, { id: typeChart }).display;
			$scope.whichChart = typeChart;
		}
	}
});