/* eslint-env browser */

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  paths: {
    'angular': 'node_modules/angular/angular',
    'angular-mocks': 'node_modules/angular-mocks/angular-mocks',
    'lodash': 'node_modules/lodash/lodash',

		data: 'static/data',
		json: 'node_modules/requirejs-plugins/src/json',
		text: 'node_modules/requirejs-text/text',
  },

  shim: {
    'angular': { exports: 'angular' },
    'angular-mocks': { deps: ['angular'], exports: 'angular.mock' },
    'lodash': { exports: '_' },
  },

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
});
