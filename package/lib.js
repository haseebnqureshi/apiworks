'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(options, log) {

	var libPath = options.dirname + options.folders.lib;

	var methods = read(libPath);

	var lib = {};

	_.each(methods, function(path) {

		var info = path.split('/');

		var table = info[0];

		var method = info[1].replace(/\.js/, '');

		if (!lib[table]) { lib[table] = {}; }

		lib[table][method] = require(libPath + '/' + path);

	});

	_.each(lib, function(methods, table) {

		log('gray', '      lib.' + table + ' = {' + _.keys(methods).join(', ') + '}');

	});

	return lib;

};
