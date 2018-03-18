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

	// REVIEW ALL the site unit tests need to mock this dependency :/
	// - is there a better way that we can define them?
	// - should the tours be specified in the controller? - that seems weird, it only starts there
	// - should each tour be it's own directive? - that feels too disparate, or am i just being stilly
	// - it's nice having a global register, and state needs to be maintained across pages
	// - TODO each tour should live in it's base module (types in types, dex in dex)
	siteModule.run(homeToursSetup);

	return siteModule;
});