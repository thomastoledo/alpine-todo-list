const { src, dest, watch, task } = require('gulp');
const bro = require('gulp-bro');
const browserSync = require('browser-sync').create();
const del = require('del');

function _build() {
    src('./src/cjs-modules/*.js')
        .pipe(bro())
        .pipe(dest('./dist'));
    src('./src/scripts/**/*.js')
        .pipe(dest('./dist'));
    src(['./src/**/*.html', './src/**/*.css'])
        .pipe(dest('./dist'));
}

function _clean() {
    del.sync('./dist');
}

function _watch() {
    watch(['src/*/*.js', 'src/**/*.html'], _build);
    watch(['src/*/*.js', 'src/**/*.html']).on('change', browserSync.reload);
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