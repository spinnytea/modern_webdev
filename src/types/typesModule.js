define([
	'angular',
	'lodash',
	'./rateDisplayFilter',
	'./rateStyleFilter',
	'./squareDirective',
	'./typeChartController',
	'./typesFactory',
], function (
	angular,
	_,
	rateDisplayFilter,
	rateStyleFilter,
	squareDirective,
	typeChartController,
	typesFactory
) {
	var typesModule = angular.module('po_ke_type.types', [
		squareDirective.name,
	]);

	typesModule.filter('rateDisplay', rateDisplayFilter);
	typesModule.filter('rateStyle', rateStyleFilter);
	typesModule.controller('po_ke_type.types.chart.controller', typeChartController);
	typesModule.factory('po_ke_type.types.factory', typesFactory);

	return typesModule;
});