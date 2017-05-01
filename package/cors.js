'use strict';

var _ = require('underscore');

/*
This dynamic header loading allows us to custom set headers and 
origins from our extras when scaffolding application.
*/

var getCorsAllowed = function(type) {

	var items = _.filter(process.env, function(value, key) {

		var pattern = new RegExp('CORS\_ALLOWED\_' + type.toUpperCase(), 'i')

		return key.match(pattern);

	});

	return items.join(', ') || '*';

};

module.exports = function(app, express, options, log) {

	var origin = getCorsAllowed('Origin');

	var methods = getCorsAllowed('Methods');

	var headers = getCorsAllowed('Headers');

	log('gray', '      Access-Control-Allow-Origin: ' + origin);
	log('gray', '      Access-Control-Allow-Methods: ' + methods);
	log('gray', '      Access-Control-Allow-Headers: ' + headers);

	app.use(function(req, res, next) {

		res.setHeader('Access-Control-Allow-Origin', origin);

		res.setHeader('Access-Control-Allow-Methods', methods);

		res.setHeader('Access-Control-Allow-Headers', headers);

		next();

	});

	return app;

};
