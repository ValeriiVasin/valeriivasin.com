'use strict';

var liveServer = require('live-server');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('html', () => {
  gulp.src('src/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('css', () => {
  return gulp.src('src/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public'));
});

gulp.task('dev', ['build'], () => {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/*.css', ['css']);

  liveServer.start({
    port: 8000,
    root: './public',
    noBrowser: true
  });
});

gulp.task('build', ['html', 'css']);
