define([
	'site/headController',
], function (
	headController
) {
	var module = angular.module('po_ke_type.site', []);

	module.controller('po_ke_type.site.head.controller', headController);

	return module;
});