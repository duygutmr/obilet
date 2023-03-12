/// <binding BeforeBuild="build" />
const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const iconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");
const prefix = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rollup = require("gulp-better-rollup");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

let runTimestamp = Math.round(Date.now() / 1000);

const configuration = {
  paths: {
    src: {
      css: ["public/src/scss/style.scss"],
      js: ["public/src/js/script.js"],
    },
  },
};

function css() {
  return src(configuration.paths.src.css)
    .pipe(concat("style.min.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      cleanCSS({ compatibility: "ie10", level: { 1: { specialComments: 0 } } })
    )
    .pipe(prefix())
    .pipe(dest("output/_assets/css"))
    .pipe(browserSync.reload({ stream: true }));
}

function js() {
  return src(configuration.paths.src.js, { sourcemaps: false })
    .pipe(
      rollup(
        {
          plugins: [
            babel({
              babelrc: false,
              presets: [["@babel/preset-env", { modules: false }]],
            }),
            nodeResolve(),
            commonjs(),
          ],
        },
        { format: "umd" }
      )
    )
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(dest("output/_assets/js"))
    .pipe(browserSync.reload({ stream: true }));
}

function views() {
  return src("views/**.html")
    .pipe(dest("output/"))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src(["public/src/icons/*.svg"], { base: "public/src" })
    .pipe(
      iconfontCss({
        fontName: "fonticons",
        targetPath: "../../../../public/src/scss/icons/icons.scss",
        fontPath: "../fonts/web-icons/",
      })
    )
    .pipe(
      iconfont({
        fontName: "fonticons",
        prependUnicode: false,
        appendCodepoints: true,
        formats: ["ttf", "eot", "woff", "woff2", "svg"],
        timestamp: runTimestamp,
        normalize: true,
        fontHeight: 448,
        descent: 64,
        fontHeight: 1001,
      })
    )
    .pipe(dest("output/_assets/fonts/web-icons/"));
}

function browserSyncBrowser() {
  browserSync.init({
    server: {
      baseDir: "./output",
      index: "./index.html",
    },
  });
}

exports.build = parallel(views, css, js, (done) => {
  done();
});

exports.fonts = parallel(fonts, views, css, js, (done) => {
  done();
});

exports.default = series(fonts, views, css, js, (done) => { 
  watch(["public/src/icons/*.svg"], fonts);
  watch(["views/**/**"], views);
  watch(["public/src/scss/**", "public/src/scss/**/**"], css);
  watch(["public/src/js/**/**"], js);
  browserSyncBrowser();
  done();
});
