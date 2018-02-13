'use strict';
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var merge = require('merge-stream');
var path = require('path');


// build config

var dist = Object.freeze({
	root: 'dist',
	vendor: 'dist/vendor',
});
var resources_static = 'static/**/*';
var vendor = [
	[ 'bootstrap', 'node_modules/bootstrap/dist/**/*' ],
	[ 'bootswatch', 'node_modules/bootswatch/*/bootstrap.min.css' ],
	[ 'jquery', 'node_modules/jquery/dist/jquery.min.js' ],
];


// main builds

// npx gulp build, npx gulp lint
gulp.task('build', [ 'build:static', 'build:vendor' ]);
gulp.task('lint', [ 'lint:js' ]);


// build tasks

gulp.task('lint:js', function () {
	return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});

gulp.task('build:static', function () {
	return gulp.src(resources_static)
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
