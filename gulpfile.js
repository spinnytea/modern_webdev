'use strict';
var gulp = require('gulp');
var path = require('path');
var requirejs = require('requirejs');
// gulp deps
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var eslint = require('gulp-eslint');
var glob = require('glob');
var gls = require('gulp-live-server');
var gutil = require('gutil');
var htmlhint = require('gulp-htmlhint');
var less = require('gulp-less');
var lesshint = require('gulp-lesshint');
var merge = require('merge-stream');
var noop = require('gulp-noop');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');

// TODO usage
// TODO required gulp commnad
// TODO port
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
	css: ['src/**/*.less', 'src/**/*.css'],
	static: 'static/**/*',
});
var vendor = [
	['angular', 'node_modules/angular/angular.min.js'],
	['angular', 'node_modules/angular-local-storage/dist/angular-local-storage.min.js'],
	['angular', 'node_modules/angular-route/angular-route.min.js'],
	['bootstrap', 'node_modules/bootstrap/dist/js/bootstrap.min.js'],
	['bootstrap', 'node_modules/bootswatch/*/bootstrap.min.css'],
	['font-awesome/css', 'node_modules/font-awesome/css/*'],
	['font-awesome/fonts', 'node_modules/font-awesome/fonts/*'],
	['.', 'node_modules/jquery/dist/jquery.min.js'],
	['.', 'node_modules/lodash/lodash.min.js'],
	['requirejs', 'node_modules/requirejs/require.js'],
	['requirejs', 'node_modules/requirejs-plugins/src/*'],
	['requirejs', 'node_modules/requirejs-text/text.js'],
	['requirejs', 'node_modules/requirejs-plugins/lib/Markdown.Converter.js'],
];


// main build targets

// npx gulp build, npx gulp lint
gulp.task('build', ['build:js', 'build:html', 'build:css', 'build:static', 'build:vendor']);
gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);
gulp.task('buildd', [], function () {
	gulp.watch(resources.js, ['build:js']);
	gulp.watch(resources.html, ['build:html']);
	gulp.watch(resources.css, ['build:css']);
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
	return gulp.src(['**/*.js', '!node_modules/**/*', '!dist/**/*'])
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

gulp.task('lint:html', function () {
	return gulp.src(resources.html)
	.pipe(htmlhint('.htmlhintrc'))
	.pipe(htmlhint.reporter())
	.pipe(htmlhint.failOnError());
});
gulp.task('build:html', ['lint:html'], function () {
	return gulp.src(resources.html)
		.pipe(templateCache({ standalone: true }))
		.pipe(gulp.dest('dist'));
});

gulp.task('lint:css', function () {
	return gulp.src(resources.css)
		.pipe(lesshint())
		.pipe(lesshint.reporter('lesshint-reporter-stylish'))
		.pipe(lesshint.failOnError()); // TODO doesn't actually fail on error
});
gulp.task('build:css', ['lint:css'], function () {
	// TODO default bootstrap theme
	// collect the list of theme names in bootswatch
	var themes = glob.sync('node_modules/bootswatch/*/variables.less').map(function (filepath) {
		return path.basename(path.dirname(filepath));
	});
	return merge(themes.map(function (theme) {
		// pre-concat the variable file to main (in-memory action)
		return gulp.src(['node_modules/bootswatch/' + theme + '/variables.less', 'src/main.less'])
			.pipe(concat('main.less'))
			// compile less
			.pipe(argv.skipUglify ? noop() : sourcemaps.init())
			.pipe(less({ paths: resources.less }))
			.pipe(argv.skipUglify ? noop() : cleanCSS())
			.on('error', function () { gutil.log(arguments); this.emit('end'); })
			.pipe(argv.skipUglify ? noop() : sourcemaps.write('.'))
			.pipe(gulp.dest(path.join(dist.root, 'themes', theme)));
		}));
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
