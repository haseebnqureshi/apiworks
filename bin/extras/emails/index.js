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

var path = require('path');

var fs = require('fs');

var mustache = require('mustache');

var postmark = require('postmark');

var _ = require('underscore');

var client = new postmark.Client(process.env.POSTMARK_API_TOKEN);

var From = process.env.POSTMARK_FROM;


/*==============
Model
==============*/

/*
Export model and also set it to var, for easy use inside
this resource's middlewares and routes.
*/

var prepareEmail = function(To, templateName, data, callback) {

	/*
	First we get our email templates, which consist
	of one html file and one txt file.
	*/

	var filepathSubject = path.resolve(__dirname, 'templates', `${templateName}.txt`);
	var filepathBody = path.resolve(__dirname, 'templates', `${templateName}.html`);
	var templates = {
		subject: fs.readFileSync(filepathSubject, 'utf8'),
		body: fs.readFileSync(filepathBody, 'utf8'),
	};

	/*
	Let's now introduce all process.env settings into our 
	data object, so that we can print any global settings
	that may be pertinent to our application.
	*/

	var data = data || {};
	data = _.extend(data, process.env);

	/*
	Next, we take our data and render our found templates.
	*/

	var Subject = mustache.render(templates.subject, data || {});
	var HtmlBody = mustache.render(templates.body, data || {});

	/*
	Finally, we return our postmark sendEmail arguments object.
	*/

	return { To, From, Subject, HtmlBody };

};

var model = module.exports.model = {

	send: function(options) {

		var options = options || {};
		var to = options.to || '';
		var template = options.template || '';
		var data = options.data || {};
		var callback = options.callback || function(err, success) {};
		var emailArgs;

		try {
			emailArgs = prepareEmail(to, template, data, callback);
		}
		catch(err) {
			return callback(err, null);
		}

		client.sendEmail(emailArgs || {}, function(err, success) {
			return callback(err, success);
		});

	}

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

	app.get('/email/example/:to', function(req, res) {
		var to = req.params.to || '';
		model.send({
			to: to,
			template: 'example',
			data: { to },
			callback: function(err, success) {
				var err = err ? err.toString() : null;
				var status = err ? 500 : 200;
				return res.status(status).send({ status, to, err, success });
			}
		});
	});

	return app;

};
