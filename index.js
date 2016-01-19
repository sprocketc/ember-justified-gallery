/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-justified-gallery',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    app.import(app.bowerDirectory + '/Justified-Gallery/dist/css/justifiedGallery.css');
    app.import(app.bowerDirectory + '/Justified-Gallery/dist/js/jquery.justifiedGallery.js');
  }
};
