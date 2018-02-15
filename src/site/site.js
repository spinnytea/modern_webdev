define([
	'site/headController',
	'site/homeController',
	'site/pageHeaderDirective',
	'site/settingsFactory',
	'site/settingsController',
], function (
	headController,
	homeController,
	pageHeaderDirective,
	settingsFactory,
	settingsController
) {
	var module = angular.module('po_ke_type.site', []);

	module.constant('po_ke_type.site.defaultTheme', 'spacelab');
	module.controller('po_ke_type.site.head.controller', headController);
	module.controller('po_ke_type.site.home.controller', homeController);
	module.directive('pageHeader', pageHeaderDirective);
	module.factory('po_ke_type.site.settings', settingsFactory);
	module.controller('po_ke_type.site.settings.controller', settingsController);

	return module;
});