define([
	'angular',
	'notDevMode',
	'./rateDisplayFilter',
	'./rateStyleFilter',
	'./squareDirective',
	'./typeChartController',
	'./typesFactory',
	'./typesToursSetup',
], function (
	angular,
	notDevMode,
	rateDisplayFilter,
	rateStyleFilter,
	squareDirective,
	typeChartController,
	typesFactory,
	typesToursSetup
) {
	var typesModule = angular.module('po_ke_type.types', [
		squareDirective.name,
	]);

	typesModule.filter('rateDisplay', rateDisplayFilter);
	typesModule.filter('rateStyle', rateStyleFilter);
	typesModule.controller('po_ke_type.types.chart.controller', typeChartController);
	typesModule.factory('po_ke_type.types.factory', typesFactory);

	if(notDevMode) typesModule.run(typesToursSetup);

	return typesModule;
});