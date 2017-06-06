'use strict';

/**
 * Module dependencies.
 */
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const Router = require('koa-router');
const config = require('../config/db');

// Load the mongoose models
module.exports.load = function(app, db) {
  var router = new Router();

  router.get('/', function(ctx, next) {
    console.log(ctx.query);
    ctx.body = 'Endpoint return';
  });

  // Globbing model files
  glob('api/**/*.routes.js', (err, files) => {
    if (err) {
      return console.error(chalk.red(err));
    }
    files.forEach(modelPath => {
      console.error(chalk.green('Loaded: ' + modelPath));
      require(path.resolve(modelPath))(router);
    });
  });

  app.use(router.routes())
    .use(router.allowedMethods());
};
