const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
//开发环境编译任务  实时监听
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                //不让外部的.babelrc影响内部
                babelrc: false,
                "plugins": ["transform-es2015-modules-commonjs"]
            }))
            .pipe(gulp.dest('build'))
    })
});
//线上环境编译任务  不需要实时监听
gulp.task('buildprod', () => {
    //./src/nodeuii/config/index.js 不参与babel编译（babel编译会和rollup冲突）
    gulp.src(['./src/nodeuii/**/*.js', '!./src/nodeuii/config/index.js'])
        .pipe(babel({
            //不让外部的.babelrc影响内部
            babelrc: false,
            ignore: ["./src/nodeuii/config/index.js"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest('build'))
});
// tree-shaking任务
gulp.task('buildconfig', () => {
    gulp.src('./src/nodeuii/config/*.js')
        //用 rollup对 node中配置信息config下的index.js进行tree shaking （rollup可以编译es6 所以这里不需要babel）
        .pipe(rollup({
            output: {
                format: "cjs",
            },
            input: "./src/nodeuii/config/index.js",
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./build/config'))
});

let _task = ["builddev"];

//线上环境  需要tree-shaking优化
if (process.env.NODE_ENV == "production") {
    _task = ["buildprod", "buildconfig"];
}
gulp.task("default", _task);