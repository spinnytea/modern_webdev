/* global angular: false */
'use strict';

// setup a module to deal with awkward dependencies
beforeAll(function () {
	var module = angular.module('setup.js', []);
	module.value('po_ke_type.utils.tours.factory', {
		register: angular.noop,
		start: angular.noop,
	});
});

// jasmine uses wierd syntax... .skip and .only is cleaner
it.skip = xit;
it.only = fit;
describe.skip = xdescribe;
describe.only = fdescribe;
