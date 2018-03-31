// Karma configuration
// Generated on Wed Feb 21 2018 22:11:42 GMT-0500 (EST)
// And then subsequently modified
module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'jasmine-jquery', 'requirejs'],

		// plugins to use
		plugins: [
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-firefox-launcher',
			'karma-ie-launcher',
			'karma-jasmine',
			'karma-jasmine-diff-reporter',
			'@metahub/karma-jasmine-jquery',
			'karma-junit-reporter',
			'karma-ng-html2js-preprocessor',
			'karma-phantomjs-launcher',
			'karma-nyan-reporter',
			'karma-requirejs',
			'karma-spec-reporter',
		],


		// list of files / patterns to load in the browser
		files: [
			// load jquery/angular first
			'node_modules/jquery/dist/jquery.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-mocks/angular-mocks.js',

			// bootstrap the tests
			'test/setup.js',
			'test/test-main.js',

			// let angular know about our code
			// requirejs will pull in our js/json files
			{ pattern: 'src/**/*.js', included: false },
			{ pattern: 'static/**/*', included: false },
			{ pattern: 'test/**/*.js', included: false },
			{ pattern: 'test/test resources/**/*', included: false },
			// html files will run through html2js and are needed up front
			{ pattern: 'src/**/*.html', included: true },

			// vendor dependencies we'll get through requirejs
			{ pattern: 'dist/vendor/fuzzysearch.js', included: false }, // HACK we shouldn't rely on dist for tests
			{ pattern: 'node_modules/bluebird/js/browser/bluebird.js', included: false },
			{ pattern: 'node_modules/lodash/lodash.js', included: false },
			{ pattern: 'node_modules/moment/**/*', included: false },
			{ pattern: 'node_modules/requirejs-plugins/src/*', included: false },
			{ pattern: 'node_modules/requirejs-text/text.js', included: false },
		],

		// list of files / patterns to exclude
		exclude: [
			'src/dataModule.js',
			'src/mainModule.js',
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/**/*.js': ['coverage'],
			'src/**/*.html': ['ng-html2js'],
		},

		// karma-coverage configuration
		coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			includeAllSources: true,
		},

		// ng-html2js configuration
		ngHtml2JsPreprocessor: {
			stripPrefix: 'src/',
			moduleName: 'html2js',
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['nyan'],

		// karma-jasmine-diff-reporter doesn't require configuration
		// reporters: ['jasmine-diff'],
		// jasmine-diff looks aweful and doesn't play nice with nyan
		// but sometimes the output is tricky, and the diff is dead useful
		// it's just a tool that needs to be used as-needed; it's not good for use all the time

		// karma-junit-reporter configuration
		// reporters: ['coverage'],
		junitReporter: {
			outputDir: 'coverage',
		},

		// karma-spec-reporter configuration
		// reporters: ['spec'],
		// it's a nice looking output and useful when you want to see a summary of all the test
		// we have junit as one of the coverage reporters (i.e. npx gulp test -c) which is typically more useful
		// however, this is really useful for printing out which tests are skipped (i.e. npx gulp test --skipped)
		specReporter: {
			maxLogLines: 5,             // limit number of lines logged per test
			suppressErrorSummary: true, // do not print error summary
			suppressFailed: false,      // do not print information about failed tests
			suppressPassed: false,      // do not print information about passed tests
			suppressSkipped: true,      // do not print information about skipped tests
			showSpecTiming: false,      // print the time elapsed for each spec
			failFast: true,             // test would finish with error when a first fail occurs.
		},


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// browsers: ['Chrome', 'Firefox', 'PhantomJS', 'IE'],
		browsers: ['PhantomJS'],


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		// concurrency: Infinity,
		concurrency: 2,
	});
};
