/*!
 * handlebars-helper-unsplash <https://github.com/helpers/handlebars-helper-unsplash>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function () {
  var Handlebars = require('handlebars');
  var _ = require('lodash');
  var assemble = this;

  var tmpl = '<img src="<%= uri %>" width="<%= width %>" height="<%= height %>">';

  var helpers = {};


  /**
   * Generate an img tag for http://unsplash.it
   *
   * **Example**
   *
   * ```handlebars
   * {{unsplash 800 150 random=true}}
   * ```
   * 
   * @param  {Number} `width`   Width of the generated image
   * @param  {Number} `height`  Height of the generated image
   * @param  {Object} `options` Options passed from Handlebars
   * @return {String} Html img tag with specified properties.
   */
  
  helpers.unsplash = function (width, height, options/*, callback */) {
    var uri = 'http://unsplash.it';

    // no width or height passed
    if (typeof width === 'object') {
      options = width;
      width = options.hash.width;
      height = options.hash.height || width;
    }

    // no height passed
    if (typeof height === 'object') {
      options = height;
      height = options.hash.height || width;
    }

    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Handlebars Helper (unsplash): width and height must be numbers');
    }

    // grayscale is a special case
    if (options.hash.hasOwnProperty('grayscale') || options.hash.hasOwnProperty('g')) {
      var g = options.hash.grayscale || options.hash.g;
      if (g) {
        uri += '/g';
      }
      delete options.hash.grayscale;
      delete options.hash.g;
    }

    // assign the width and height to the uri
    uri += '/' + width + '/' + height;

    delete options.hash.width;
    delete options.hash.height;

    // assign any additional properties on the hash to the uri
    _.forOwn(options.hash, function (value, key) {
      // if the value is a boolean and false, just return so it's not added to the uri
      if (typeof value === 'boolean' && value === false) {
        return;
      }

      // make sure either ? or & is added to the uri
      if (uri.indexOf('?') === -1) {
        uri += '?';
      } else {
        uri += '&';
      }

      // add the key and/or value to the uri
      uri += '' + key + (typeof value === 'boolean' ? '' : '=' + value);

    });

    // build the actual img tag
    var img = _.template(tmpl)({uri: uri, width: width, height: height});
    return new Handlebars.SafeString(img);
  };

  return helpers;
};