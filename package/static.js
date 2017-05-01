'use strict';

var _ = require('underscore');

module.exports = function(app, express, options) {

	var staticPath = options.dirname + options.folders.models;

	var staticOptions = _.extend(options.dirname + options.folders.static);

	app.use(express.static(staticOptions));

	return app;

};
