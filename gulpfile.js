const { src, dest, series } = require('gulp');
const bro = require('gulp-bro');
const { watch } = require('gulp');

function build(cb) {
    src('./src/cjs-modules/*.js')
        .pipe(bro())
        .pipe(dest('./dist'));
    src('./src/scripts/*.js')
        .pipe(dest('./dist'));
    src('./src/**/*.html')
        .pipe(dest('./dist'));
    cb();
}

function _watch() {
    watch(['src/*/*.js', 'src/**/*.html'], build);      
}

exports.default = series(build, _watch);
exports.build = build;