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
	var siteModule = angular.module('po_ke_type.site', []);

	siteModule.controller('po_ke_type.site.head.controller', headController);
	siteModule.controller('po_ke_type.site.home.controller', homeController);
	siteModule.directive('pageHeader', pageHeaderDirective);
	siteModule.controller('po_ke_type.site.settings.controller', settingsController);
	siteModule.factory('po_ke_type.site.settings.factory', settingsFactory);

	return siteModule;
});