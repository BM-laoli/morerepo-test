const gulp = require('gulp');
const dev = require('./task/dev');
const build = require('./task/build');
// 并行任务 后续加入样式处理 可以并行处理
const task = gulp.parallel(dev);
exports.build = task;
exports.default = task;