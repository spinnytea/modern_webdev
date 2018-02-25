// Karma configuration
// Generated on Wed Feb 21 2018 22:11:42 GMT-0500 (EST)
// And then subsequently modified
module.exports = function (config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'requirejs'],

		// plugins to use
		plugins: [
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-jasmine',
			'karma-jasmine-diff-reporter',
			'karma-junit-reporter',
			'karma-phantomjs-launcher',
			'karma-nyan-reporter',
			'karma-requirejs',
		],


		// list of files / patterns to load in the browser
		files: [
			'test/test-main.js',
			{ pattern: 'src/**/*.js', included: false },
			{ pattern: 'static/**/*', included: false },
			{ pattern: 'test/**/*.js', included: false },

			{ pattern: 'node_modules/angular/angular.js', included: false },
			{ pattern: 'node_modules/angular-mocks/angular-mocks.js', included: false },
			{ pattern: 'node_modules/lodash/lodash.js', included: false },
			{ pattern: 'node_modules/requirejs-plugins/src/*', included: false },
			{ pattern: 'node_modules/requirejs-text/text.js', included: false },
		],

		// list of files / patterns to exclude
		exclude: [
			'src/main.js',
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/**/*.js': ['coverage'],
		},

		// karma-coverage configuration
		coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			includeAllSources: true,
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['nyan'],
		// jasmine-diff looks aweful and doesn't play nice with nyan
		// but sometimes the output is tricky, and the diff is dead useful
		// it's just a tool that needs to be used as-needed; it's not good for use all the time
		// reporters: ['jasmine-diff'],

		// karma-junit-reporter configuration
		junitReporter: {
			outputDir: 'coverage',
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
		browsers: ['Chrome', 'PhantomJS'],


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
