'use strict';
const del = require('del');
const gulp = require('gulp');
const merge = require('merge-stream');
const path = require('path');


// build config

const dist = Object.freeze({
	root: 'dist',
	vendor: 'dist/vendor',
});
const resources_static = 'static/**/*';
const vendor = [
	[ 'jquery', 'node_modules/jquery/dist/jquery.min.js' ],
	[ 'bootstrap', 'node_modules/bootstrap/dist/**/*' ],
];


// build tasks

gulp.task('build:static', function() {
	return gulp.src(resources_static)
		.pipe(gulp.dest(dist.root));
});

gulp.task('build:vendor', function() {
	return merge(vendor.map(function([dest, src]) {
		return gulp.src(src).pipe(gulp.dest(path.join(dist.vendor, dest)));
	}));
});

gulp.task('build', [ 'build:static', 'build:vendor' ]);


// clean up workspace

gulp.task('clean', function() {
	return del(dist.root);
});

gulp.task('clean:vendor', function() {
	return del(dist.vendor);
});
