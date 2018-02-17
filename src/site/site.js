define([
	'angular',
	'./headController',
	'./homeController',
	'./pageHeaderDirective',
	'./settingsController',
	'./settingsFactory',
], function (
	angular,
	headController,
	homeController,
	pageHeaderDirective,
	settingsController,
	settingsFactory
) {
	var module = angular.module('po_ke_type.site', []);

	module.constant('po_ke_type.site.defaultTheme', 'spacelab');
	module.controller('po_ke_type.site.head.controller', headController);
	module.controller('po_ke_type.site.home.controller', homeController);
	module.directive('pageHeader', pageHeaderDirective);
	module.controller('po_ke_type.site.settings.controller', settingsController);
	module.factory('po_ke_type.site.settings', settingsFactory);

	return module;
});