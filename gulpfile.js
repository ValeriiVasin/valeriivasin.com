'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

const gulpAmpValidator = require('gulp-amphtml-validator');

// css dependency is needed for amp (import css output)
gulp.task('html', ['css'], () => {
  gulp.src('src/index*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('amp:validate', () => {
  return gulp.src('src/index.amp.html')
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('img', () => {
  gulp.src('src/img/*.*')
    .pipe(gulp.dest('public/img'));
});

gulp.task('css', () => {
  return gulp.src('src/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public'));
});

gulp.task('dev', ['build'], () => {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/*.css', ['css']);
});

gulp.task('build', ['html', 'css', 'img']);
