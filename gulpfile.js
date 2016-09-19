var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('uglify', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('3d_slider.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('src/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['uglify']);
});

gulp.task('default', ['watch']);

