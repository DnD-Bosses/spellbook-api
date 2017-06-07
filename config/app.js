'use strict';

/**
 * Module dependencies.
 */
const config = require('./');
const mongoose = require('./lib/mongoose');
const router = require('./lib/router');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const chalk = require('chalk');

// Initialize Models
mongoose.loadModels();

module.exports.init = function init(callback) {
  mongoose.connect(function(db) {

    // Initialize express
    let app = new Koa(db);

    if (callback) callback(app, db, config);
  });
};

module.exports.start = function start(callback) {
  let _this = this;

  _this.init(function(app, db, config) {

    app.use(bodyParser());

    router.load(app, db);

    // Start the app

    app.listen(config.port, config.host, function() {
      // Logging initialization
      console.log('--');
      console.log(chalk.green('Spellbook API Server Started!'));
      console.log(chalk.green('Location: http://' + config.host + ':' + config.port));
      console.log('--');

      if (callback) callback(app, db, config);
    });
  });
};
