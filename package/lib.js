'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(options, db, log) {

	var libPath = options.dirname + options.folders.lib;

	var methods = read(libPath);

	var lib = {};

	_.each(methods, function(path) {

		//we only care about js files
		if (!path.match(/\.js$/)) { return; }

		var info = path.split('/');

		var table = info[0];

		var method = info[1].replace(/\.js/, '');

		if (!lib[table]) { lib[table] = {}; }

		lib[table][method] = require(libPath + '/' + path)(db);

	});

	_.each(lib, function(methods, table) {

		log('gray', '      lib.' + table + ' = {' + _.keys(methods).join(', ') + '}');

	});

	return lib;

};
