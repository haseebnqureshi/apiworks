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

var model = module.exports.model = {

};


/*==============
Middlewares
==============*/

module.exports.middlewares = function(app, express, models) {

	// setting pug options
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/views');

	return app;

};


/*==============
Routes
==============*/

module.exports.routes = function(app, express, models) {

	app.get('/', function(req, res) {
		var message = 'Welcome!';
		res.render('index', { message });
	});

	return app;

};
