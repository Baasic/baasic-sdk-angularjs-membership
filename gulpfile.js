/* jshint node: true */
'use strict';
var docgen = require('baasic-javascript-docgen');
var injectVersion = require('gulp-inject-version');

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	stylish = require('jshint-stylish');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('jshint', function () {
  return gulp.src([
    'gulpfile.js'
	]
	.concat(paths.scripts))
    .pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter(stylish));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(['*.moduleDefinition.js', '*.js']))
	.pipe(plugins.concat('baasic-angular-membership.js'))
	.pipe(plugins.header('/*\n Baasic AngularJS Membership %%GULP_INJECT_VERSION%%\n (c) 2014-2016 Mono http://baasic.com\n License: MIT\n*/\n(function (angular, undefined) {\n'))  
	.pipe(plugins.footer('\n})(angular);'))
    .pipe(injectVersion())
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify({output: {comments: /^!|License: MIT/i}}))
	.pipe(plugins.rename('baasic-angular-membership.min.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('docs', function() {
  docgen.generateBaasicDocs('src', 'wiki', 'Baasic Membership Navigation', ['config.js'], ['home.md']);
});

gulp.task('default', ['jshint', 'scripts', 'docs']);
