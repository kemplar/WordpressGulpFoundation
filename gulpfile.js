/*jslint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

 
gulp.task('sass', function () {
    gulp.src('./jointswp-child/*.scss')
    .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(gulp.dest('./jointswp-child'));
});

gulp.task('js', function () {
gulp.src('jointswp-child/js/src/*.js')
.pipe(concat('theme.js'))
.pipe(plumber(plumberErrorHandler))
.pipe(gulp.dest('js'));
});

gulp.task('img', function() {
  gulp.src('jointswp-child/images/src/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(plumber(plumberErrorHandler))
    .pipe(gulp.dest('img'))
});

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('default', ['sass', 'js', 'img', 'watch']);

gulp.task('watch', function () {
livereload.listen();
gulp.watch('jointswp-child/*.scss', ['sass']);
gulp.watch('jointswp-child/js/src/*.js', ['js']);
gulp.watch('jointswp-child/img/src/*.{png,jpg,gif}', ['img']);
});