var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngmin = require('gulp-ngmin');

gulp.task('scripts', function () {
  return gulp.src('ab-svc.js')
    .pipe(rename('ab-svc.min.js'))
    .pipe(ngmin())
    .pipe(uglify({
      preserveComments: 'some',
      outSourceMap: true
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', function () {
  gulp.start('scripts');
});