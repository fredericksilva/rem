var gulp = require('gulp');
var babel = require('gulp-babel');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('babel', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      stage: 1,
      blacklist: [
        'es6.constants',
        'es6.forOf',
        'es6.spec.symbols',
        'es6.spec.templateLiterals',
        'es6.templateLiterals',
      ],
      optional: [
        'asyncToGenerator',
        'runtime',
      ],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('coffee', function() {
  return gulp.src('src/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['babel', 'coffee']);
