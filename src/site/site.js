define([
	'site/headController',
	'site/pageHeaderDirective',
], function (
	headController,
	pageHeaderDirective
) {
	var module = angular.module('po_ke_type.site', []);

	module.constant('po_ke_type.site.defaultTheme', 'spacelab');
	module.controller('po_ke_type.site.head.controller', headController);
	module.directive('pageHeader', pageHeaderDirective);

	return module;
});