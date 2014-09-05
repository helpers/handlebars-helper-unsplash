
var assemble = require('assemble');
var gulp = require('gulp');
var helpers = require('handlebars-helpers');
var Handlebars = require('handlebars');

helpers.register(Handlebars, {assemble:assemble});

assemble.helpers(require('./')());

assemble.set('assets', '_gh_pages/assets');

assemble.task('demo', function () {
  assemble.src('example/index.hbs')
    .pipe(assemble.dest('_gh_pages'));
});

assemble.task('copy', function () {
  gulp.src('example/assets/**/*.*')
    .pipe(gulp.dest('_gh_pages/assets'));
})

assemble.task('default', ['demo', 'copy']);