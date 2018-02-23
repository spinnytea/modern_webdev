define([
	'angular',
	'lodash',
	'./rateDisplayFilter',
	'./rateStyleFilter',
	'./squareDirective',
	'./typeChartController',
	'./typesFactory',
], function (angular, _, rateDisplayFilter, rateStyleFilter, squareDirective, typeChartController, typesFactory) {
	var module = angular.module('po_ke_type.types', []);

	module.filter('rateDisplay', rateDisplayFilter);
	module.filter('rateStyle', rateStyleFilter);
	module.directive('typeSquare', squareDirective);
	module.controller('po_ke_type.types.chart.controller', typeChartController);
	module.factory('po_ke_type.types.factory', typesFactory);

	return module;
});