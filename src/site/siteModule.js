define([
	'angular',
	'./headController',
	'./homeController',
	'./homeToursSetup',
	'./pageHeaderDirective',
	'./settingsController',
	'./settingsFactory',
], function (
	angular,
	headController,
	homeController,
	homeToursSetup,
	pageHeaderDirective,
	settingsController,
	settingsFactory
) {
	var siteModule = angular.module('po_ke_type.site', [
		pageHeaderDirective.name,
	]);

	siteModule.controller('po_ke_type.site.head.controller', headController);
	siteModule.controller('po_ke_type.site.home.controller', homeController);
	siteModule.controller('po_ke_type.site.settings.controller', settingsController);
	siteModule.factory('po_ke_type.site.settings.factory', settingsFactory);

	siteModule.run(homeToursSetup); // XXX ALL the site unit tests need to mock this dependency :/

	return siteModule;
});