const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

function style() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/**/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
}
exports.style = style;

function js() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/popper.min.js",
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}
exports.js = js;

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/**/*.scss"],
    style
  );
  gulp.watch("src/*.html").on("change", browserSync.reload);
}

exports.watch = watch;

function fonts() {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("src/fonts"));
}
exports.fonts = fonts;

function fa() {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
}

gulp.task("default", gulp.parallel(style, js, fonts, fa));
