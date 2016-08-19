var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('patterns/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./patterns/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('patterns/**/*.scss',['styles']);
});