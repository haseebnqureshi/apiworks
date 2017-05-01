'use strict';

var pug = require('pug');

module.exports = function(app, express, options) {

	app.set('view engine', 'pug');

	return app;

};
