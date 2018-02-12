'use strict';
const gulp = require('gulp');

// build config

const dist = 'dist';
const resources = Object.freeze({
	static: [ 'static/**/*' ],
});

// build tasks

gulp.task('build-static', function() {
	return gulp.src(resources.static)
		.pipe(gulp.dest(dist));
});

gulp.task('build', ['build-static']);
