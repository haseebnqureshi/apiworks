'use strict';

var onFinished = require('on-finished');

module.exports = function(settings, express, app, log) {

	app.use('*', function(req, res, next) {

		var method = req.method;
		
		var url = req.originalUrl;

		var info = url + ' [' + method.toUpperCase() + ']';

		onFinished(req, function(err, req) {

			log('green', info + ' ...Done!');

		});

		console.log();

		log('yellow', info + ' Started...');

		var body = req.body;

		if (body) {

			log('gray', '   req.body ' + JSON.stringify(body));

		}

		next();

	});

	return app;

};
