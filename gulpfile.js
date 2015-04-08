'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');

var path = {
  HTML_SRC: './client/src/stego.html',
  HTML_PUBLIC: './client/dist/public',
  ENTRY_POINT: './client/src/js/App.jsx',
  OUT: 'bundle.js',
  PUBLIC: './client/dist/public/js',
  CSS_SRC: './client/src/css/style.css',
  CSS_PUBLIC: './client/dist/public/css',
  IMAGES_SRC: './client/src/images/**',
  IMAGES_PUBLIC: './client/dist/public/images'
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
  gulp.src([path.HTML_SRC])
  .pipe(gulp.dest(path.HTML_PUBLIC));
  gulp.src([path.IMAGES_SRC])
  .pipe(gulp.dest(path.IMAGES_PUBLIC));
});

gulp.task('styles', function(){
  return gulp.src(path.CSS_SRC)
  .pipe(minifyCSS())
  .pipe(gulp.dest(path.CSS_PUBLIC))
  .pipe(notify('Styles Build Complete!'));
});

// gulp.task('watch', function(){
//   var watcher = watchify(build({
//     entries: [path.ENTRY_POINT],
//     transform: [reactify],
//     debug: true,
//     cache: {}, packageCache: {}, fullPaths: true
//   }));

//   return watcher.on('update', function(){

//   })
// })
