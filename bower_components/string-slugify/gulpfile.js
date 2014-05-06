'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	complexity = require('gulp-complexity'),
	jasmine = require('gulp-jasmine'),
	wrap = require('gulp-wrap-exports'),
	rename = require('gulp-rename');

gulp.task('analysis', function(){
	return gulp.src(['*.js', '!cli.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(complexity());
});

gulp.task('test', function(){
	return gulp.src('spec.js')
		.pipe(jasmine());
});

gulp.task('build', ['test'], function(){
	return gulp.src('index.js')
		.pipe(wrap({ name: 'slugify' }))
		.pipe(rename('slugify.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['analysis', 'test', 'build']);
