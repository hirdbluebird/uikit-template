var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var autoprefixerOptions = {
	browsers: ['> 1%']
}

gulp.task('browserSync', ['sass'], function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('sass', function() {
	return gulp.src('assets/sass/main.sass')
			   .pipe(sass().on('error', sass.logError))
			   .pipe(autoprefixer(autoprefixerOptions))
			   .pipe(cssmin())
			   .pipe(rename({suffix: '.min'}))
			   .pipe(gulp.dest('assets/css'))
			   .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browserSync'], function(){
	gulp.watch('assets/sass/*.sass', ['sass', browserSync.reload]);
});