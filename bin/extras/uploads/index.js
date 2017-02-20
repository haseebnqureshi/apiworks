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

var multer = require('multer');

var path = require('path');

var slug = require('slug');

var storage = multer.diskStorage({

	destination: function(req, file, cb) {
		cb(null, path.resolve(__dirname, 'files'));
	},

	filename: function(req, file, cb) {
		var extname = path.extname(file.originalname);
		var basename = slug(path.basename(file.originalname, extname)).toLowerCase();
		var timestamp = new Date().getTime();
		cb(null, `${timestamp}-${basename}${extname}`);
	}

});

var uploads = multer({ storage });


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

	return app;

};


/*==============
Routes
==============*/

module.exports.routes = function(app, express, models) {

	app.post('/upload', uploads.single('upload'), function(req, res) {
		var file = req.file || null;
		var status = req.file ? 200 : 400;
		res.status(status).send({ file });
	});

	return app;

};
