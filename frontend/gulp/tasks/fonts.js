var gulp = require('gulp');

gulp.task('fonts', function(){
  return gulp.src('app/styles/fonts/*')
    .pipe(gulp.dest('./dev/fonts'))
});