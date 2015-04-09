'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var minifyCSS = require('gulp-minify-css');
var watchify = require('watchify');

var path = {
  HTML_SRC: './client/src/stego.html',
  HTML_PUBLIC: './client/dist/public',
  CSS_SRC: './client/src/css/style.css',
  CSS_PUBLIC: './client/dist/public/css',
  ENTRY_POINT: './client/src/js/App.jsx',
  OUT: 'bundle.js',
  PUBLIC: './client/dist/public/js',
  JS_SRC: './client/src/js/**.js',
  IMAGES_SRC: './client/src/images/**',
  IMAGES_PUBLIC: './client/dist/public/images',
  BOWER_SRC: './client/src/bower_components/**',
  BOWER_PUBLIC: './client/dist/bower_components'
};

// Compile JSX file to build.js
gulp.task('js', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
  .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.PUBLIC))
    .pipe(notify('Stego JS Build Complete!'));
});

// Minify styles files to dist
gulp.task('css', function(){
  return gulp.src(path.CSS_SRC)
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.CSS_PUBLIC))
    .pipe(notify('Stego CSS Build Complete!'));
});

// Copy html file to dist
gulp.task('html', function(){
  return gulp.src([path.HTML_SRC])
  .pipe(gulp.dest(path.HTML_PUBLIC))
  .pipe(notify('Stego HTML Build Complete!'));
})

// Copy image files to dist
gulp.task('images', function(){
  gulp.src([path.IMAGES_SRC])
  .pipe(gulp.dest(path.IMAGES_PUBLIC))
  .pipe(notify('Stego assets have been copied over!'));
})

// Copy bower components to dist
gulp.task('bower', function(){
  gulp.src([path.BOWER_SRC])
  .pipe(gulp.dest(path.BOWER_PUBLIC))
  .pipe(notify('Bower components have been copied over!'));
})

// Copy non-JSX JS files to dist
gulp.task('js-src', function(){
  gulp.src([path.JS_SRC])
  .pipe(gulp.dest(path.PUBLIC))
  .pipe(notify('JS sources have been copied over!'));
})

// JS Watch task
gulp.task('watch-js', function(){
  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function(){
    watcher.bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.PUBLIC))
    .pipe(notify('WATCH: Stego JS Build Complete!'));
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.PUBLIC));
});

// CSS Watch task
gulp.task('watch-css', function(){
  gulp.watch(path.CSS_SRC, function(){
    return gulp.src(path.CSS_SRC)
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.CSS_PUBLIC))
    .pipe(notify('WATCH: Stego Styles Build Complete!'));
  })
});

// HTML Watch task
gulp.task('watch-html', function(){
  gulp.watch(path.HTML_SRC, function(){
    return gulp.src([path.HTML_SRC])
    .pipe(gulp.dest(path.HTML_PUBLIC))
    .pipe(notify('WATCH: Stego HTML Build Complete!'));
  })
});

// When "gulp" is run in the terminal, this is what will be called
gulp.task('build', ['js', 'css', 'html', 'images', 'bower']);
gulp.task('default', ['watch-js', 'watch-css', 'watch-html']);
