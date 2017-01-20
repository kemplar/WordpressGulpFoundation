/*jslint node: true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
    proxy: {
        target: "localhost",
        ws: true
    }
    });
});
 
gulp.task('sass', function () {
    gulp.src('./jointswp-child/*.scss')
    .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(gulp.dest('./jointswp-child'))
        .pipe(bs.reload({stream:true}));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
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

gulp.task('default', ['sass', 'browser-sync', 'js', 'img', 'watch']);

gulp.task('watch', ['browser-sync'], function () {
gulp.watch('jointswp-child/*.css', ['sass']);
gulp.watch('jointswp-child/*.scss', ['sass']);
gulp.watch("jointswp-child/*.html").on('change', bs.reload);
gulp.watch('jointswp-child/js/src/*.js', ['js']);
gulp.watch('jointswp-child/img/src/*.{png,jpg,gif}', ['img']);
});