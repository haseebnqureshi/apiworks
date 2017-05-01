'use strict';

var _ = require('underscore');

module.exports = function(app, express, options, log) {

	var staticPath = options.dirname + options.folders.models;

	var staticOptions = _.extend(options.dirname + options.folders.static);

	log('gray', '      Serving from ' + staticOptions);

	app.use(express.static(staticOptions));

	return app;

};
