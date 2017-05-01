'use strict';

var _ = require('underscore');

var read = require('fs-readdir-recursive');

module.exports = function(options, log) {

	var dialect = process.env.DB_DIALECT || 'nosqldb';

	var dbPath = options.dirname + options.folders.db + '/' + dialect;

	var methods = read(dbPath);

	var db = {};

	_.each(methods, function(path) {

		if (path === 'connect.js') { return; }

		var info = path.split('/');

		var table = info[0];

		var method = info[1].replace(/\.js/, '');

		if (!db[table]) { db[table] = {}; }

		db[table][method] = require(dbPath + '/' + path);

	});

	_.each(db, function(methods, table) {

		log('gray', '      Table "' + table + '" {' + _.keys(methods).join(', ') + '}');

	});

	db.connect = require(dbPath + '/connect.js');

	return db;

};
