'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');

var path = {
  HTML: './client/main/stego.html',
  ENTRY_POINT: './client/src/js/App.jsx',
  OUT: 'bundle.js',
  PUBLIC: './client/dist/public/js',
  CSS_SRC: './client/src/css/style.css',
  CSS_PUBLIC: './client/dist/public/css'
};

gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
  .bundle()
  .pipe(source(path.OUT))
  .pipe(gulp.dest(path.PUBLIC))
  .pipe(notify('Stego Build Complete!'));
});

gulp.task('styles', function(){
  return gulp.src(path.CSS_SRC)
  .pipe(minifyCSS())
  .pipe(gulp.dest(path.CSS_PUBLIC))
  .pipe(notify('Styles Build Complete!'));
});
