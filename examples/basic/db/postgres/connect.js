'use strict';

var pg = require('pg');

var types = require('pg').types;

types.setTypeParser(20, function(val) {
	return parseInt(val);
});

module.exports = function(callback /* client */, autoDrain) {

	var client = new pg.Client({
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		port: process.env.PG_PORT
	});

	//disconnects client when all queries have finished,
	//or you could use client.end() explicitly.

	if (autoDrain !== false) {
		client.on('drain', client.end.bind(client));
	}

	client.connect();

	return callback(client);

};
