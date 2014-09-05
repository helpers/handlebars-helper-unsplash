
var assemble = require('assemble');
var helpers = require('handlebars-helpers');
var Handlebars = require('handlebars');
// var Handlebars = require('assemble/node_modules/handlebars');

helpers.register(Handlebars, {assemble:assemble});

assemble.helpers(require('./')());

assemble.set('assets', './example/assets');

assemble.task('demo', function () {
  assemble.src('example/index.hbs')
    .pipe(assemble.dest('example'));
});

assemble.task('default', ['demo']);