define([
	'site/site',
], function (site) {
	var module = angular.module('po_ke_type', [ site.name ]);

	angular.bootstrap(document, ['po_ke_type']);

	return module;
});