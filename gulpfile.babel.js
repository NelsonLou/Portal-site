import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';

// 删除构建文件
gulp.task('clean', () => {
  const del = require('del');

  return del('dist');
});

// 创建 pug 任务
gulp.task('pug', () => {
  const pug = require('gulp-pug');

  return gulp.src('./src/pug/*.pug').pipe(pug({pretty: true})).pipe(gulp.dest('./dist/html/')).pipe(connect.reload());
});

// 创建 styles 任务
gulp.task('styles', () => {
  const postcss = require('gulp-postcss');
  const precss = require('precss');
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');

  const processors = [
    precss(),
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];

  return gulp.src('./src/css/*.css').pipe(sourcemaps.init()).pipe(postcss(processors)).pipe(sourcemaps.write('./')).pipe(gulp.dest('./dist/css/')).pipe(connect.reload());
});

// 创建 scripts 任务
/* gulp.task('scripts', err => {
  const pump = require('pump');
  const watchify = require('watchify');
  const browserify = require('browserify');
  const babelify = require('babelify');
  const source = require('vinyl-source-stream');
  const buffer = require('vinyl-buffer');
  const uglify = require('gulp-uglify');

  const opts = {
    entries: ['./src/js/app.js'],
    debug: true
  };
  pump([
    watchify(browserify(opts).transform(babelify)).bundle(),
    source('app.js'),
    buffer(),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write('./'),
    gulp.dest('./dist/js/'),
    connect.reload()
  ], err);
}); */

gulp.task('scripts', err => {
  const pump = require('pump');
  // const watchify = require('watchify');
  // const browserify = require('browserify');
  // const babelify = require('babelify');
  // const source = require('vinyl-source-stream');
  // const buffer = require('vinyl-buffer');
  const uglify = require('gulp-uglify');

  // const opts = {
  //   entries: ['./src/js/app.js'],
  //   debug: true
  // };
  pump([
    // watchify(browserify(opts).transform(babelify)).bundle(),
    // source('app.js'),
    // buffer(),
    gulp.src('./src/js/*.js'),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write('./'),
    gulp.dest('./dist/js/'),
    connect.reload()
  ], err);
});

// 创建 images 任务
gulp.task('images', () => {
  const imagemin = require('gulp-imagemin');

  return gulp.src('./src/img/**').pipe(imagemin()).pipe(gulp.dest('./dist/img/')).pipe(connect.reload());
});

// 创建 watch 任务
gulp.task('watch', () => {
  gulp.watch(['./src/pug/*.pug'], ['pug']);
  gulp.watch(['./src/css/*.css'], ['styles']);
  gulp.watch(['./src/js/*.js'], ['scripts']);
  gulp.watch(['./src/img/**'], ['images']);
});

// 创建 connect 任务
gulp.task('connect', () => {
  connect.server({root: './', livereload: true});
});

// 创建 start 任务
gulp.task('start', [
  'connect',
  'watch',
  'pug',
  'styles',
  'scripts',
  'images'
]);

// 创建 build pug 任务
gulp.task('build-pug', () => {
  const pug = require('gulp-pug');

  return gulp.src('./src/pug/*.pug').pipe(pug({pretty: true})).pipe(gulp.dest('./dist/html/'));
});

// 创建 build styles 任务
gulp.task('build-styles', () => {
  const postcss = require('gulp-postcss');
  const precss = require('precss');
  const autoprefixer = require('autoprefixer');
  const cssnano = require('cssnano');

  const processors = [
    precss(),
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];

  return gulp.src('./src/css/*.css').pipe(postcss(processors)).pipe(gulp.dest('./dist/css/'));
});

// 创建 build scripts 任务
gulp.task('build-scripts', err => {
  const pump = require('pump');
  const uglify = require('gulp-uglify');
  pump([
    gulp.src('./src/js/*.js'), uglify(), gulp.dest('./dist/js/')
  ], err);
});

// 创建 build images 任务
gulp.task('build-images', () => {
  const imagemin = require('gulp-imagemin');

  return gulp.src('./src/img/**').pipe(imagemin()).pipe(gulp.dest('./dist/img/'));
});

// 创建 default 任务
gulp.task('default', ['build-pug', 'build-styles', 'build-scripts', 'build-images']);
