'use strict';

module.exports = function(callback) {

	var knex = require('knex')({
		client: 'pg',
		connection: {
			host: process.env.PG_HOST,
			user: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DATABASE,
			port: process.env.PG_PORT
		}
	});

	return callback(knex);

};

/*
POTENTIALLY? Use pg's connection to execute command,
while using Knex to build commands?

var pg = require('pg');

var types = require('pg').types;

types.setTypeParser(20, function(val) {
	return parseInt(val);
});

module.exports = function(callback) {

	var client = new pg.Client({
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT
	});

	//disconnects client when all queries have finished,
	//or you could use client.end() explicitly.

	client.on('drain', client.end.bind(client));

	client.connect();

	return callback(client);

};

*/
