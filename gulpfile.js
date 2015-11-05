'use strict';

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

gulp.task('watch', ['html', 'css'], () => {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/*.css', ['css']);
});

gulp.task('build', ['html', 'css']);
