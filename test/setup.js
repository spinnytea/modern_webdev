'use strict';
beforeEach(function () {
	var module = angular.module('setup.js', []);
	module.value('po_ke_type.utils.tours.factory', {
		register: angular.noop,
		start: angular.noop,
	});
});
