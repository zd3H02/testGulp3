'use strict'

let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let sass = require("gulp-sass");
let del = require("del");
let plumber = require("gulp-plumber");


gulp.task("copy", function(){
    return gulp.src([
            "assets/**/*.html"
        ])
        .pipe(plumber())
        .pipe(gulp.dest("html/"))
        .pipe(browserSync.stream());
});

gulp.task("sass", function(){
    return gulp.src([
            "assets/sass/**/*.scss"
        ])
        .pipe(plumber())
        .pipe(sass({outputStyle:"expanded"}))
        .pipe(gulp.dest("html/css/"))
        .pipe(browserSync.stream());
});

gulp.task("delHtml", function(){
    return del(["html/**/*.html"]);
});

gulp.task("delSass", function(){
    return del(["html/**/*.css"]);
});

gulp.task("default", ["delHtml", "delSass", "copy","sass"], function(){
    browserSync.init({
        server:{
            baseDir: "html"
        },
        browser: "chrome"
    });
    gulp.watch(["assets/**/*.html"],["delHtml", "copy"]);
    gulp.watch(["assets/sass/**/*.scss"],["delSass", "sass"]);
});