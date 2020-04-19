"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const phpConnect = require('gulp-connect-php');
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const concat = require('gulp-concat');


const all_css = [
    './src/css/style.css'
];

const all_js = [
  './src/js/main.js'
];

// connect php
function connectsync() {
    phpConnect.server({}, function (){
        browsersync.init({
            proxy: '127.0.0.1:8000',
            "browser": ["chrome"]
        });
    });
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
  return del(["./dist"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./src/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/img"));
}

// Fonts task
function fonts() {
    return gulp
        .src("./fonts/**/*")
        .pipe(gulp.dest("./dist/fonts/"));
    }

// SCSS task
function scss() {
return gulp
    .src("./src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./src/css/"));
}

// CSS task
function css() {

    return gulp
    .src( all_css, { allowEmpty: true })
    .pipe(concat('all.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest("./dist/css/"));
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(all_js, { allowEmpty: true  })
      .pipe(plumber())
      .pipe(concat('all.js'))
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest("./dist/js/"))
  );
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.php", browserSyncReload);
  gulp.watch("./src/fonts/**/*", gulp.series(fonts));
  gulp.watch("./src/sass/**/*", gulp.series(scss, css));
  gulp.watch("./src/js/**/*", gulp.series(scripts));
  gulp.watch(
    [
      "./**/*",
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch("./src/img/**/*", images);
}

// define complex tasks
const js = gulp.series(scripts);
const watch = gulp.parallel(watchFiles, connectsync);
const build = gulp.series(clean, fonts, scss, css, images, js, watch );

// export tasks
exports.images = images;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;