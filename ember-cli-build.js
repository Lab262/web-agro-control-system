/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
module.exports = function (defaults) {

  let app = new EmberApp(defaults, {
    'ember-power-select': {
      theme: 'material'
    },


    sassOptions: {
      includePaths: ['bower_components/material-design-lite/src']
    }
  });
  let materialSVG = pickFiles('bower_components/material-design-lite/src/images', {
    srcDir: '/',
    files: ['**/*.svg'],
    destDir: '/images'
  });

  return mergeTrees([app.toTree(), materialSVG]);
};
