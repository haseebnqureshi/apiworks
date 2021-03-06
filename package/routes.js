'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(settings, express, app, db, lib, log) {

	var routesPath = settings.dirname + settings.folders.routes;

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

			case settings.routes.files.get:
				type = 'request';
				method = 'get';
				break;

			case settings.routes.files.post:
				type = 'request';
				method = 'post';
				break;

			case settings.routes.files.put:
				type = 'request';
				method = 'put';
				break;

			case settings.routes.files.delete:
				type = 'request';
				method = 'delete';
				break;

			case settings.routes.files.middleware:
				type = 'middleware';
				break;

			case settings.routes.files.render:
				type = 'render';
				break;

		}

		parts.reverse();

		parts = _.map(parts, function(part, i) {

			//filter ordering out
			if (part.match(/^[0-9]+\_/)) {

				order += Math.pow(10, i+1);

				//if we have middleware, we bump it slightly higher in our queue
				if (type === 'middleware') {
					order -= 2;
				}

				//if we have a render, bump it slightly lower than a potential __get
				if (type === 'render') {
					order += 2;
				}

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

				var callback = require(route.path)(settings, express, app, db, lib, log);

				app[route.method](route.routerPath, callback);

				log('gray', '         + request ' + route.routerPath + ' [' + route.method.toUpperCase() + ']');

				break;

			case 'middleware':

				var callback = require(route.path)(settings, express, app, db, lib, log);

				app.use(route.routerPath, callback);

				log('gray', '      - middleware ' + route.routerPath);

				break;

			case 'render':

				app.get(route.routerPath, function(req, res) {

					res.render(route.path, {});

				});

				log('gray', '      -- render ' + route.routerPath);

				break;

		}

	});

	return app;

};
