const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

const src = './src/**/*.js';

gulp.task('clean', () => {
  gulp.src('dist', { read: false })
      .pipe(clean());
});

gulp.task('babel', () => {
  gulp.src(src).pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch(src, ['babel']);
});

gulp.task('default', ['babel', 'watch']);
