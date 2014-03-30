var exec       = require('child_process').exec;
var watchify   = require('watchify');

var brfs       = require('brfs');
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var mocha      = require('gulp-mocha');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var browserify = require('gulp-browserify');
var source     = require('vinyl-source-stream');

var options = {
  debug: true,
  insertGlobals: true,
  transform: ['brfs']
};

// browserify all the things!
gulp.task('build-app', function() {
  return gulp.src('./client/app/main.js')
           .pipe(browserify(options))
          //.pipe(uglify())
          .pipe(gulp.dest('./client/static/build'));
});


gulp.task('build-test', function() {
  return gulp.src('./client/test/spec/*.js')
          .pipe(concat('index.js'))
          .pipe(browserify(options))
          //.pipe(uglify())
          .pipe(gulp.dest('./client/test'));
});


gulp.task('hint', function() {
  return gulp.src([
    './*.js',
    './server/server.js',
    './server/db/*.js',
    './client/app/**/*.js', // models, views etc.
    './client/app/main.js',
    '!./client/test/spec/*.js',
    '!./client/node_modules/*', // exclude client modules
    '!./server/node_modules/*'  // exclude server modules
  ])
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
});


// Watch for changes in the background
gulp.task('watch', function() {
  var bundler = watchify('./client/app/main.js');
  bundler.transform('brfs');

  function rebundle() {
    return bundler.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./client/static/build'));
  }

  bundler.on('update', rebundle);
  return rebundle();
});


gulp.task('test-client', function() {
  exec('xdg-open client/test/test.html');
});


gulp.task('test-server', function() {
  return gulp.src('./server/test/*.js')
            .pipe(mocha({ reporter: 'spec' }));
});


// Test Client and Server
gulp.task('test', function() {
  gulp.start('test-client', 'test-server');
});


// Build the Client
gulp.task('build', function() {
  gulp.start('build-app', 'build-test');
});


gulp.task('default', function() {
  gulp.start('build-app', 'hint');
});
