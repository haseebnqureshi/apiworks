'use strict';

/*
HQ: Instead of the traditional MVC design patterns, 
we prefer keeping everything related to one resource,
together in one easy place. 

You could stub these out into separate files, but 
we find that it's always good to start with 
something simple before needing anything more complex.

We return each Model, Middlewares and Routes, allowing
our main express file to decide the order of waterfalling
any resources we'd want.
*/

/*==============
Dependencies
==============*/

var bodyParser = require('body-parser');
var _ = require('underscore');


/*==============
Model
==============*/

/*
Export model and also set it to var, for easy use inside
this resource's middlewares and routes.
*/

var model = module.exports.model = {

};


/*==============
Middlewares
==============*/

module.exports.middlewares = function(app, express, models) {

	// accepting req.body
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// allowing cors
	app.use(function(req, res, next) {

		/*
		This dynamic loading allows us to custom set headers and 
		origins from our extras when scaffolding the api.
		*/

		var origins = _.filter(process.env, function(value, key) {
			return key.match(/CORS\_ALLOWED\_ORIGIN/i);
		}).join(',') || '*';

		var methods = _.filter(process.env, function(value, key) {
			return key.match(/CORS\_ALLOWED\_METHODS/i);
		}).join(',') || '*';

		var headers = _.filter(process.env, function(value, key) {
			return key.match(/CORS\_ALLOWED\_HEADERS/i);
		}).join(',') || '*';

		res.setHeader('Access-Control-Allow-Origin', origins);
		res.setHeader('Access-Control-Allow-Methods', methods);
		res.setHeader('Access-Control-Allow-Headers', headers);

		console.log('res.headers', res.headers);

		next();

	});

	// allowing preflight responses for local development
	if (process.env.CORS_PREFLIGHT_ENABLED === true) {

		app.use(function(req, res, next) {
			if (req.method.toLowerCase() === 'options') {
				return res.status(200).send();
			}
			next();
		});

	}

	return app;

};


/*==============
Routes
==============*/

module.exports.routes = function(app, express, models) {

	return app;

};
