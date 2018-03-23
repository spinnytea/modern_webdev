/* global angular: false */
'use strict';

define('notDevMode', function () { return false; });

// setup a module to deal with awkward dependencies
// tours are configure when a module is initialized
// this needs to be available up immediately
var setupModule = angular.module('setup.js', []);
setupModule.value('po_ke_type.utils.tours.factory', {
	register: angular.noop,
	start: angular.noop,
});
// all of our tests will need these modules available
angular.module('ngAnimate', []);
angular.module('ngRoute', []);
angular.module('cfp.hotkeys', []);
beforeEach(angular.mock.module('setup.js'));
beforeEach(angular.mock.module('html2js'));

// jasmine uses wierd syntax... .skip and .only is cleaner
it.skip = xit;
it.only = fit;
describe.skip = xdescribe;
describe.only = fdescribe;
