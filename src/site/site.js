define([
	'site/headController',
	'site/pageHeaderDirective',
	'site/settingsFactory',
	'site/settingsController',
], function (
	headController,
	pageHeaderDirective,
	settingsFactory,
	settingsController
) {
	var module = angular.module('po_ke_type.site', []);

	module.constant('po_ke_type.site.defaultTheme', 'spacelab');
	module.controller('po_ke_type.site.head.controller', headController);
	module.directive('pageHeader', pageHeaderDirective);
	module.factory('po_ke_type.site.settings', settingsFactory);
	module.controller('po_ke_type.site.settings.controller', settingsController);

	return module;
});