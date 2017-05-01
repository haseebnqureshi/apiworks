'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

var parseFolderName = function(folderName) {

	var info = {
		order: null,
		param: false,
		name: ''
	};

	var matches = folderName.match(/([0-9]+)\_?(\-*)([a-z0-9\-\_]+)/i);

	if (!matches) { return info; }

	if (matches[1]) {
		info.order = parseInt(matches[1]);
	}

	if (matches[2]) {
		info.param = matches[2] === '' ? false : true;
	}

	if (matches[3]) {
		info.name = matches[3];
	}

	return info;

};

var parseRoutePaths = function(routePaths) {

	var routes = {};

	_.each(routePaths, function(path) {

		console.log(path.split(/\//));

	});

};

module.exports = function(app, express, options) {

	var routesPath = options.dirname + options.folders.routes;

	var routePaths = read(routesPath);

	var routes = parseRoutePaths(routePaths);

	return app;

};
