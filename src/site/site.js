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
	module.constant('po_ke_type.site.themes', ['cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti']);
	module.controller('po_ke_type.site.head.controller', headController);
	module.directive('pageHeader', pageHeaderDirective);
	module.factory('po_ke_type.site.settings', settingsFactory);
	module.controller('po_ke_type.site.settings.controller', settingsController);

	return module;
});