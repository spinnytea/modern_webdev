'use strict';
var colors = require('ansi-colors');
var gulp = require('gulp');
var Server = require('karma').Server;
var opn = require('opn');
var path = require('path');
var requirejs = require('requirejs');
// gulp deps
var bootlint = require('gulp-bootlint');
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
var rename = require('gulp-rename');
var scss2less = require('gulp-scss2less');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');

var argv = require('yargs')
	.usage('Usage: npx gulp [tasks] [options]')
	.command('clean', 'remove dist')
	.command('lint', 'run all linters')
	.command('test', 'run karma')
	.command('build', 'run all build commands')
	.command('buildd', 'continuous full build, rebuild when files change')
	.command('server', 'build and start dev server')
	.example('npx gulp buildd server', 'start continuous build and dev server')
	.example('npx gulp clean:vendor', 'just clean vendor while tinkering with deployment')
	.option('minify', {
		describe: 'minify source and produce source maps',
		alias: 'm',
		type: 'boolean',
		default: true,
		group: 'Build:',
	})
	.option('port', {
		describe: 'dev server port',
		alias: 'p',
		type: 'number',
		default: 3000,
		group: 'Build:',
	})
	.option('coverage', {
		describe: 'enable coverage report',
		alias: 'c',
		type: 'boolean',
		default: false,
		group: 'Test:',
	})
	.option('skipped', {
		describe: 'print out only skipped tests',
		type: 'boolean',
		default: false,
		group: 'Test:',
		// TODO conflicts with --coverage, --watch
	})
	.option('watch', {
		describe: 'continuous mode, re-run when files change',
		alias: 'w',
		type: 'boolean',
		default: false,
		group: 'Test:',
	})
	.option('help', {
		alias: 'h',
		group: 'System:',
	})
	.option('version', {
		alias: 'v',
		group: 'System:',
	})
	.demandCommand(1, 'You need to specify at least one gulp task.')
	.argv;


// build config

var dist = Object.freeze({
	root: 'dist',
	all: 'dist/**/*',
	vendor: 'dist/vendor',
});
var resources = Object.freeze({
	js: 'src/**/*.js',
	html: ['src/**/*.html', 'static/index.html'],
	css: ['src/**/*.less', 'src/**/*.css'],
	static: 'static/**/*',
});


// main build targets

gulp.task('build', ['build:js', 'build:html', 'build:css', 'build:static', 'build:vendor']);
gulp.task('lint', ['lint:js', 'lint:html', 'lint:css']);

// continuous build
// this doesn't have dependencies so it still runs even with lint failures at start
// TODO can we make this work with `build -w` instead of `buildd`?
gulp.task('buildd', function () {
	gulp.watch(resources.js, ['build:js']);
	gulp.watch(resources.html, ['build:html']);
	gulp.watch(resources.css, ['build:css']);
	gulp.watch(resources.static, ['build:static']);
	gulp.start('build');
});

// the whole point of this build is that we serve static files from
// the only reason we need a server is because we are loading json files
// the browswer will ONLY load js files, not even html (that's why we have templateCache)
// TODO server crashes when html is invalid (attr without value)
gulp.task('server', ['build'], function () {
	var server = gls.static(dist.root, argv.port);
	server.start();
	gulp.watch(dist.all, function (file) {
		server.notify.apply(server, [file]);
	}).on('error', function () { gutil.log(arguments); this.emit('end'); });
	opn('http://localhost:' + argv.port);
});


// build tasks

gulp.task('lint:js', function () {
	return gulp.src(['**/*.js', '!node_modules/**/*', '!dist/**/*', '!coverage/**/*'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task('build:js', ['lint:js'], function (done) {
	var amdConfig = require('./build_scripts/requirejs_build_config')(argv.minify);
	requirejs.optimize(amdConfig, function () {
		done();
	}, function (err) {
		done(err);
	});
});

gulp.task('lint:html', function () {
	return gulp.src(resources.html)
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.reporter())
		.pipe(htmlhint.failOnError())
		.pipe(bootlint({
			stoponerror: true,
			disabledIds: ['W001', 'W002', 'W003', 'W005', 'E001', 'E003'],
			reportFn: function (file, lint, isError, isWarning, errorLocation) {
				var message = [colors.bold((isError) ? colors.red('[ERROR]') : colors.yellow('[WARN] '))];
				message.push(file.path);
				if (errorLocation) {
					message.push('(line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ')');
				}
				message.push(colors.inverse(' ' + lint.id + ' '));
				message.push(lint.message);
				console.log(message.join(' '));
			},
		}));
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
function doCssBuild(stream) {
	return stream
		.pipe(argv.minify ? sourcemaps.init() : noop())
		.pipe(less({ paths: resources.less }))
		.pipe(argv.minify ? cleanCSS() : noop())
		.on('error', function () { gutil.log(arguments); this.emit('end'); })
		.pipe(argv.minify ? sourcemaps.write('.') : noop());
}
gulp.task('build:css:bootstrap', ['lint:css'], function () {
	var stream = gulp.src(['node_modules/bootstrap/less/variables.less', 'src/main.less'])
		.pipe(concat('main.less'));
	return doCssBuild(stream)
		.pipe(gulp.dest(path.join(dist.root, 'themes', 'default')));
});
gulp.task('build:css:bootswatch', ['lint:css'], function () {
	// collect the list of theme names in bootswatch
	var themes = glob.sync('node_modules/bootswatch/*/variables.less').map(function (filepath) {
		return path.basename(path.dirname(filepath));
	});
	return merge(themes.map(function (theme) {
		// pre-concat the variable file to main (in-memory action)
		var stream = gulp.src(['node_modules/bootswatch/' + theme + '/variables.less', 'src/main.less'])
			.pipe(concat('main.less'));
		return doCssBuild(stream)
			.pipe(gulp.dest(path.join(dist.root, 'themes', theme)));
	}));
});
gulp.task('build:css:colorful', function () {
	var stream = gulp.src('src/colorful-types.less');
	return doCssBuild(stream)
		.pipe(gulp.dest(dist.root));
});
gulp.task('build:css:solarized', ['lint:css'], function () {
	// collect the list of theme names in bootswatch
	var themes = ['dark', 'light'];
	return merge(themes.map(function (theme) {
		// convert scss variables to less
		// pre-concat the variable file to main (in-memory action)
		var stream = merge([
			gulp.src([
				'node_modules/bootstrap-solarized-theme/sass/_solarized-palette.scss',
				'node_modules/bootstrap-solarized-theme/sass/_variables-'+theme+'.scss',
			]).pipe(scss2less()),
			gulp.src('src/main.less'),
		]).pipe(concat('main.less'));
		return doCssBuild(stream)
			.pipe(gulp.dest(path.join(dist.root, 'themes', 'solarized-'+theme)));
	}));
});
gulp.task('build:css', ['build:css:bootstrap', 'build:css:bootswatch', 'build:css:colorful', 'build:css:solarized'], function () {});

gulp.task('build:static', function () {
	return gulp.src(resources.static)
		.pipe(gulp.dest(dist.root));
});

gulp.task('build:vendor', ['build:vendor:solarized'], function () {
	var vendorList = require('./build_scripts/vendor_dist_list')();
	return merge(vendorList.map(function (array) {
		var dest = array[0], src = array[1];
		return gulp.src(src).pipe(gulp.dest(path.join(dist.vendor, dest)));
	}));
});
gulp.task('build:vendor:solarized', function () {
	var themes = ['dark', 'light'];
	return merge(themes.map(function (theme) {
		return gulp.src('node_modules/bootstrap-solarized-theme/dist/css/solarized-'+theme+'-theme.min.css')
			.pipe(rename('bootstrap.min.css'))
			.pipe(gulp.dest(path.join(dist.vendor, 'bootstrap', 'solarized-'+theme)));
	}));
});


// test

gulp.task('test', function (done) {
	var options = {
		configFile: __dirname + '/test/karma.conf.js',
	};

	if(argv.coverage) {
		options.reporters = ['nyan', 'coverage', 'junit'];
	}

	if(argv.skipped) {
		options.browsers = ['PhantomJS'];
		options.reporters = ['spec'];
		options.specReporter = {
			suppressErrorSummary: true,
			suppressFailed: true,
			suppressPassed: true,
			suppressSkipped: false,
			failFast: true,
		};
	}

	if(argv.watch) {
		options.autoWatch = true;
		options.singleRun = false;
	}

	new Server(options, done).start();
});


// clean up workspace

gulp.task('clean', ['clean:dist', 'clean:coverage'], function () {});

gulp.task('clean:dist', function () {
	return del(dist.root);
});

gulp.task('clean:vendor', function () {
	return del(dist.vendor);
});

gulp.task('clean:coverage', function () {
	return del('coverage');
});
