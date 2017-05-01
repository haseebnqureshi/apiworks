'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(app, express, options, log) {

	var routesPath = options.dirname + options.folders.routes;

	/*
	This method does our heavy lifting. It turns a router filepath
	into a route object, containing information necessary for 
	Express to create a valid route. 

	Even more impressive, is the ordering system that is used
	to conduct explicity waterfalls inside the app. More 
	documentation to come.
	*/

	var parsePathInfoRoute = function(path) {

		var parts = path.split('/');

		var lastPart = '/' + parts.pop();

		var order = 0;

		var type = null;

		var method = null;

		switch (lastPart) {

			case options.routes.files.get:
				type = 'request';
				method = 'get';
				break;

			case options.routes.files.post:
				type = 'request';
				method = 'post';
				break;

			case options.routes.files.put:
				type = 'request';
				method = 'put';
				break;

			case options.routes.files.delete:
				type = 'request';
				method = 'delete';
				break;

			case options.routes.files.middleware:
				type = 'middleware';
				break;

			case options.routes.files.render:
				type = 'render';
				break;

		}

		parts.reverse();

		parts = _.map(parts, function(part, i) {

			//filter ordering out
			if (part.match(/^[0-9]+\_/)) {

				order += Math.pow(10, i+1);

				part = part.replace(/^[0-9]+\_/, '');
			}

			//replacing hyphen with colon
			if (part.match(/^\-/)) {
				part = part.replace(/^\-/, ':');
			}

			return part;

		});

		parts.reverse();

		var routerPath = '/' + parts.join('/');

		return {
			order: order,
			type: type,
			method: method,
			routerPath: routerPath,
			path: routesPath + '/' + path
		};

	};

	var routePaths = read(routesPath);

	var routes = _.map(routePaths, parsePathInfoRoute);

	//ensuring routes are sorted by order...
	routes = _.sortBy(routes, 'order');

	//now creating routes in our app...
	_.each(routes, function(route) {

		switch (route.type) {

			case 'request':

				log('request ' + route.routerPath + ' [' + route.method.toUpperCase() + ']');
				app[route.method](route.routerPath, function(req, res) {
					return res.status(200).send();
				});

				break;

			case 'middleware':

				log('middleware ' + route.routerPath);
				app.use(route.routerPath, function(req, res, next) {
					next();
				});

				break;

		}

	});

	return app;

};
