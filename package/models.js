'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(options) {

	var modelsPath = options.dirname + options.folders.models;

	var methods = read(modelsPath);

	var models = {};

	_.each(methods, function(path) {

		var info = path.split('/');

		var table = info[0];

		var method = info[1].replace(/\.js/, '');

		if (!models[table]) { models[table] = {}; }

		models[table][method] = require(modelsPath + '/' + path);

	});

	return models;

};
