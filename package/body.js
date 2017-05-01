'use strict';

var bodyParser = require('body-parser');

module.exports = function(app, express, options, log) {

	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({ extended: true }));

	return app;

};
