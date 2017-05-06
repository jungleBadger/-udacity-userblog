/*jslint node: true, nomen:true*/
(function () {
    "use strict";

    var gulp = require("gulp"),
        argv = require('yargs').argv,
        browserify = require("gulp-browserify"),
        imageResize = require("gulp-image-resize"),
        gutil = require("gulp-util"),
        watch = require("gulp-watch"),
        filter = require("gulp-filter"),
        uglify = require("gulp-uglify"),
        imagemin = require("gulp-imagemin"),
        rename = require("gulp-rename"),
        cssnano = require("cssnano"),
        cache = require("gulp-cache"),
        postcss = require("gulp-postcss"),
        autoprefixer = require("autoprefixer"),
        changed = require("gulp-changed"),
        supportedBrowsers = [">0.1%"],
        plumber = require("gulp-plumber"),
        cssPrefixer = [
            autoprefixer({
                "remove": false,
                "browsers": supportedBrowsers
            })
        ],
        cssUglifier = [
            cssnano()
        ],
        currentContext = "";

    gulp.task("build", ["js", "css"]);

    gulp.task("js", function () {
        var production = gutil.env.type === "production";
        var modulePath = currentContext ? currentContext : ["./", (argv.module || argv.m || currentContext || "main"), "_module"].join("")

        return gulp.src([modulePath, "/js/main.js"].join(""), {read: false})
            .pipe(plumber())
            .pipe(browserify({
                debug: !production
            }))
            .pipe(rename("bundle.js"))
            .pipe(gulp.dest([modulePath, "/dist/js/"].join("")))
            .pipe(uglify())
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest([modulePath, "/dist/js/"].join("")));
    });

    gulp.task("css", function () {
        var modulePath = currentContext ? currentContext : ["./", (argv.module || argv.m || currentContext || "main"), "_module"].join("")

        return gulp.src([[modulePath, "/css/*.css"].join("")])
            .pipe(plumber())
            .pipe(postcss(cssPrefixer))
            .pipe(gulp.dest([modulePath, "/dist/css/"].join("")))
            .pipe(postcss(cssUglifier))
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest([modulePath, "/dist/css/"].join("")))
    });

    gulp.task('watch', function() {
        var modulePath = ["./", (argv.module || argv.m || currentContext || "main"), "_module"].join("");
        currentContext = modulePath;
        gulp.watch([modulePath + "/js/**/*.js", modulePath + "/js/*.js", modulePath + "/css/**/*.css"], ["build"]);
    });

    gulp.task("imagemin", function () {
        return gulp.src("./assets/images/**/*.+(png|jpg|jpeg|gif)").pipe(cache(imagemin())).pipe(gulp.dest("./assets/images/dist/"));
    });

}());