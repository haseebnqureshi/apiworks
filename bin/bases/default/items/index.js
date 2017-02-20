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


/*==============
Model
==============*/

/*
Export model and also set it to var, for easy use inside
this resource's middlewares and routes.
*/

var model = module.exports.model = function() {
	
	return {

	};

};


/*==============
Middlewares
==============*/

module.exports.middlewares = function(app, express, models) {

	app.use(function(req, res, next) {
		console.log(`applying items middleware`);
		next();
	});

	return app;

};


/*==============
Routes
==============*/

module.exports.routes = function(app, express, models) {

	app.get('/items', function(req, res) {
		var data = [];
		var status = data.length > 0 ? 200 : 404;
		res.status(status).send({ status, data });
	});

	return app;

};
