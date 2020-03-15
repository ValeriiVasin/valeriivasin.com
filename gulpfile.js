'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

const gulpAmpValidator = require('gulp-amphtml-validator');

const css = () =>
  gulp
    .src('src/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(minifyCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public'));

const img = () => gulp.src('src/img/*.*').pipe(gulp.dest('public/img'));

const templates = () =>
  gulp
    .src('src/index*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));

const ampValidate = () =>
  gulp
    .src('src/index.amp.html')
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());

const watch = () => {
  gulp.watch('src/index*.html', templates);
  gulp.watch('src/*.css', css);
};

// css dependency is needed for amp (import css output)
const build = gulp.parallel(gulp.series(css, templates), img);
const dev = gulp.series(build, watch);

module.exports = {
  dev,
  build,
  ampValidate
};
