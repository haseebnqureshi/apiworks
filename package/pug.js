'use strict';

var pug = require('pug');

module.exports = function(settings, express, app, log) {

	app.set('view engine', 'pug');

	return app;

};
