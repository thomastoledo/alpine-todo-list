let { src, dest, series } = require('gulp');
let bro = require('gulp-bro');

function build(cb) {
    src('./src/app.js')
        .pipe(bro())
        .pipe(dest('./dist'));
    src('./src/index.html')
        .pipe(dest('./dist'));
    cb();
}

exports.default = build;