
var should = require('should');
var helpers = require('../')();
var Handlebars = require('handlebars');

describe('unsplash', function () {

  it('should create an img tag with only width', function () {
    var options = {
      hash: {}
    };
    var img = helpers.unsplash(100, options);
    img.string.should.equal('<img src="http://unsplash.it/100/100" width="100" height="100">');
  });

  it('should create an img tag with width and height', function () {
    var options = {
      hash: {}
    };
    var img = helpers.unsplash(100, 200, options);
    img.string.should.equal('<img src="http://unsplash.it/100/200" width="100" height="200">');
  });

  it('should create an img tag with grayscale', function () {
    var options = {
      hash: {
        grayscale: true
      }
    };
    var img = helpers.unsplash(100, options);
    img.string.should.equal('<img src="http://unsplash.it/g/100/100" width="100" height="100">');
  });

  it('should create an img tag with random', function () {
    var options = {
      hash: {
        random: true
      }
    };
    var img = helpers.unsplash(100, options);
    img.string.should.equal('<img src="http://unsplash.it/100/100?random" width="100" height="100">');
  });

  it('should create an img tag with gravity', function () {
    var options = {
      hash: {
        gravity: 'east'
      }
    };
    var img = helpers.unsplash(100, options);
    img.string.should.equal('<img src="http://unsplash.it/100/100?gravity=east" width="100" height="100">');
  });

  it('should throw an error when width and height are not provided', function (done) {
    var options = {
      hash: {}
    };
    try {
      var img = helpers.unsplash(options);
    } catch (err) {
      err.message.should.equal('Handlebars Helper (unsplash): width and height must be numbers');
      return done(null);
    }
    done(new Error('Expected an error to be thrown'));
  });

  it('should create an img tag with width on the options', function () {
    var options = {
      hash: {
        width: 150
      }
    };
    var img = helpers.unsplash(options);
    img.string.should.equal('<img src="http://unsplash.it/150/150" width="150" height="150">');
  });

  it('should create an img tag with height on the options', function () {
    var options = {
      hash: {
        height: 300
      }
    };
    var img = helpers.unsplash(100, options);
    img.string.should.equal('<img src="http://unsplash.it/100/300" width="100" height="300">');
  });

  it('should create an img tag with width and height on the options', function () {
    var options = {
      hash: {
        width: 100,
        height: 300
      }
    };
    var img = helpers.unsplash(options);
    img.string.should.equal('<img src="http://unsplash.it/100/300" width="100" height="300">');
  });


});

describe('unsplash handlebars', function () {
  beforeEach(function () {
    Handlebars.registerHelper('unsplash', helpers.unsplash);
  });

  it('should create an img tag with only width', function () {
    var tmpl = '{{unsplash 100}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/100" width="100" height="100">');
  });

  it('should create an img tag with width and height', function () {
    var tmpl = '{{unsplash 100 200}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/200" width="100" height="200">');
  });

  it('should create an img tag with grayscale', function () {
    var tmpl = '{{unsplash 100 grayscale=true}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/g/100/100" width="100" height="100">');
  });

  it('should create an img tag with random', function () {
    var tmpl = '{{unsplash 100 random=true}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/100?random" width="100" height="100">');
  });

  it('should create an img tag with gravity', function () {
    var tmpl = '{{unsplash 100 gravity="east"}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/100?gravity=east" width="100" height="100">');
  });

  it('should throw an error when width and height are not provided', function (done) {
    try {
      var tmpl = '{{unsplash}}';
      var img = Handlebars.compile(tmpl)();
    } catch (err) {
      err.message.should.equal('Handlebars Helper (unsplash): width and height must be numbers');
      return done(null);
    }
    done(new Error('Expected an error to be thrown'));
  });

  it('should create an img tag with width on the options', function () {
    var tmpl = '{{unsplash width=150}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/150/150" width="150" height="150">');
  });

  it('should create an img tag with height on the options', function () {
    var tmpl = '{{unsplash 100 height=300}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/300" width="100" height="300">');
  });

  it('should create an img tag with width and height on the options', function () {
    var tmpl = '{{unsplash width=100 height=300}}';
    var img = Handlebars.compile(tmpl)();
    img.should.equal('<img src="http://unsplash.it/100/300" width="100" height="300">');
  });

});
