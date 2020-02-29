const { src, dest, watch, task } = require('gulp');
const bro = require('gulp-bro');
const browserSync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');

function _tailwindcss() {
    return src('src/css/*')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(dest('./dist/css'));
}

function _build() {
    _tailwindcss();
    // browserify all commonsjs modules
    src('./src/cjs-modules/*.js')
        .pipe(bro())
        .pipe(dest('./dist'));
    // move scripts
    src('./src/scripts/**/*.js')
        .pipe(dest('./dist'));
    // move html files
    return src(['./src/**/*.html'])
        .pipe(dest('./dist'));
}

function _clean() {
    return del.sync('./dist');
}

function _watch() {
    watch(['src/*/*.js', 'src/**/*.html', 'src/**/*.css'], _clean);
    watch(['src/*/*.js', 'src/**/*.html', 'src/**/*.css'], _build);
    watch(['src/*/*.js', 'src/**/*.html', 'src/**/*.css']).on('change', browserSync.reload);
}

function _serve() {
    _clean();
    _build();
    browserSync.init({
        server: "./dist"
    });
    _watch();
}

task('serve', _serve);