'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(settings, express, app, log) {

	return function(client, values, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var text = knex('lists')
			.insert(values)
			.returning('*')
			.toString();

		client.query(text, function(err, result) {

			if (!result) {
				result = { rows: [] };
			}

			return callback(err, result);

		});

	};

};
