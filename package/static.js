'use strict';

var _ = require('underscore');

module.exports = function(settings, express, app, log) {

	var staticPath = settings.dirname + settings.folders.models;

	var staticOptions = _.extend(settings.dirname + settings.folders.static);

	log('gray', '      Serving from ' + staticOptions);

	app.use(express.static(staticOptions));

	return app;

};
