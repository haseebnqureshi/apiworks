'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(options) {

	console.log(options);

	var dialect = process.env.DB_DIALECT || 'nosqldb';

	var dbPath = options.dirname + options.folders.db + '/' + dialect;

	var methods = read(dbPath);

	var db = {};

	db.connect = require(dbPath + '/connect.js');

	_.each(methods, function(path) {

		if (path === 'connect.js') { return; }

		var info = path.split('/');

		var table = info[0];

		var method = info[1].replace(/\.js/, '');

		if (!db[table]) { db[table] = {}; }

		db[table][method] = require(dbPath + '/' + path);

	});

	return db;

};
