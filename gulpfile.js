let gulp = require('gulp');
let babel = require('gulp-babel');
let clean = require('gulp-clean');


// gulp.task('clean', function () {
//   return gulp.src('dist', {read: false})
//     .pipe(clean());
// });


gulp.task('clean',()=>{
  gulp.src('dist', {read: false})
      .pipe(clean());
});


// gulp.task('babel', function () {
//   return gulp.src('./**/*.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('dist/'));
// });

var src = './src/**/*.js'

gulp.task('babel',()=>{
  gulp.src(src)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});

// gulp.task('watch', function() {
//   gulp.watch('./**/*.js', ['babel']);
// });

gulp.task('watch', ()=>{
  gulp.watch(src, ['babel']);
})


gulp.task('default', ['babel','watch'])



