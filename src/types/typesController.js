define(['lodash'], function (_) {
	return [
		'$scope', 'po_ke_type.site.settings', 'po_ke_type.types.factory',
		TypesController,
	];

	function TypesController($scope, settings, types) {
		$scope.chartName = _.find(settings.availableTypeCharts, { id: settings.preferredTypeChart }).display;
		$scope.whichChart = settings.preferredTypeChart;
		$scope.types = types;

		$scope.text = types.list.reduce(function (ret, type) {
			ret[type] = {
				name: _.capitalize(type),
				title: _.toUpper(type.substr(0,3)),
			};
			return ret;
		}, {});
	}
});