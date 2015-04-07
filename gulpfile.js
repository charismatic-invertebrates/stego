'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./client/main/stego.js');
  return b.bundle()
    .pipe(source('stego.js'))
    .pipe(gulp.dest('./build'));
});