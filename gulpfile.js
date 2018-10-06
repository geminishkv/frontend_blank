var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


gulp.task('sass', function() {
    return gulp.src([
        // boostrap scss
        'node_modules/bootstrap/scss/bootstrap.scss', 

        // app scss, add new here (create file in folder first)
        'src/assets/scss/*.scss' 
    ])
        .pipe(sass())

        // compilation destination, change if needed
        .pipe(gulp.dest("src/assets/css"))

        .pipe(browserSync.stream());
});


gulp.task('js-plugins', function() {
    return gulp.src([
        //add your plugins js here (download via npm first (make sure to find the path to needed js file in 'node_modules'))
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
    ])
        // combine all js-files into one
        .pipe(concat('plugins.js'))

        // unified .js file destination
        .pipe(gulp.dest("src/assets/js"))
        .pipe(browserSync.stream());
});



gulp.task('js', function(){
    return gulp.src([
        // your own .js files here
        'src/assets/js/dev/app.js'
    ])

    //compress js (minify)
    .pipe(uglify())


    .pipe(rename({
        basename: "app.min",
        extname: ".js"
    }))

    // final destination
    .pipe(gulp.dest('src/assets/js'))
})


gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"  
    });

    // add files here (css, js, html) if you want browser to be reloaded once file is saved
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/assets/scss/*.scss'], ['sass']);
    gulp.watch('src/assets/js/dev/app.js', ['js-watch']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['js-plugins', 'js', 'serve']);