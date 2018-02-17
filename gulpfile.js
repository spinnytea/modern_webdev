'use strict';
var gulp = require('gulp');
var del = require('del');
var eslint = require('gulp-eslint');
var gls = require('gulp-live-server');
var merge = require('merge-stream');
var path = require('path');
var requirejs = require('requirejs');
var templateCache = require('gulp-angular-templatecache');

// TODO usage
// TODO required gulp commnad
var argv = require('yargs')
	.option('skipUglify', {
		alias: 'skipMinify',
		describe: 'skip source minification',
		type: 'boolean',
	})
	.argv;


// build config

var dist = Object.freeze({
	root: 'dist',
	all: 'dist/**/*',
	vendor: 'dist/vendor',
});
var resources = Object.freeze({
	js: 'src/**/*.js',
	html: 'src/**/*.html',
	less: 'src/**/*.less',
	static: 'static/**/*',
});
var vendor = [
	[ 'angular', 'node_modules/angular/angular.min.js' ],
	[ 'angular', 'node_modules/angular-local-storage/dist/angular-local-storage.min.js' ],
	[ 'angular', 'node_modules/angular-route/angular-route.min.js' ],
	[ 'bootstrap', 'node_modules/bootstrap/dist/**/*' ],
	[ 'bootstrap', 'node_modules/bootswatch/*/bootstrap.min.css' ],
	[ 'jquery', 'node_modules/jquery/dist/jquery.min.js' ],
	[ 'lodash', 'node_modules/lodash/lodash.min.js' ],
	[ 'requirejs', 'node_modules/requirejs/require.js' ],
	[ 'requirejs', 'node_modules/requirejs-plugins/src/*' ],
	[ 'requirejs', 'node_modules/requirejs-text/text.js' ],
	[ 'requirejs', 'node_modules/requirejs-plugins/lib/Markdown.Converter.js' ],
];


// main build targets

// npx gulp build, npx gulp lint
gulp.task('build', [ 'build:js', 'build:html', 'build:static', 'build:vendor' ]);
gulp.task('lint', [ 'lint:js' ]);
gulp.task('buildd', [], function () {
	gulp.watch(resources.js, ['build:js']);
	gulp.watch(resources.html, ['build:html']);
	// gulp.watch(resources.less, ['build:less']);
	gulp.watch(resources.static, ['build:static']);
	gulp.start('build');
});

// the whole point of this build is that we serve static files from
// the only reason we need a server is because we are loading json files
// the browswer will ONLY load js files, not even html (that's why we have templateCache)
gulp.task('server', ['build'], function () {
	var server = gls.static(dist.root);
	server.start();
	gulp.watch(dist.all, function (file) {
		server.notify.apply(server, [file]);
	});
});


// build tasks

gulp.task('lint:js', function () {
	return gulp.src(resources.js)
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});
gulp.task('build:js', ['lint:js'], function (done) {
	requirejs.optimize(AMD_CONFIG, function () {
		done();
	}, function (err) {
		done(err);
	});
});
var AMD_CONFIG = {
	baseUrl: 'src',
	name: 'main',
	out: 'dist/main.js',
	optimize: (argv.skipUglify ? 'none' : 'uglify2'),
	generateSourceMaps: !argv.skipUglify,
	paths : {
		// path expansions
		data: '../static/data',

		// we can ignore vendor deps during build
		angular: 'empty:',
		lodash: 'empty:',

		// requirejs needs to have the plugins at build time
		json: '../node_modules/requirejs-plugins/src/json',
		text: '../node_modules/requirejs-text/text',
	},
	exclude: [
		// exlcude data files
		// TODO try to inlcude them again
		'json!data/pokedex.json',
		'json!data/themes.json',
		'json!data/types.json',
	],
};

gulp.task('build:html', function () {
	return gulp.src(resources.html)
		.pipe(templateCache({ standalone: true }))
		.pipe(gulp.dest('dist'));
});

gulp.task('build:static', function () {
	return gulp.src(resources.static)
		.pipe(gulp.dest(dist.root));
});

gulp.task('build:vendor', function () {
	return merge(vendor.map(function (array) {
		var dest = array[0], src = array[1];
		return gulp.src(src).pipe(gulp.dest(path.join(dist.vendor, dest)));
	}));
});


// clean up workspace

gulp.task('clean', function () {
	return del(dist.root);
});

gulp.task('clean:vendor', function () {
	return del(dist.vendor);
});
