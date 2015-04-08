'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var path = {
  ENTRY_POINT: './client/main/stego.js',
  DEST_BUILD: './build',
  OUT: './stego.js'
};

gulp.task('browserify', function() {
  var b = browserify();
  b.transform(reactify);
  b.add(path.ENTRY_POINT);
  return b.bundle()
    .pipe(source('stego.js'))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function() {
  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function (){
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_BUILD));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['watch']);
