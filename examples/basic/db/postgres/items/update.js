'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(settings, express, app, log) {

	return function(client, where, updates, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var text = knex('items')
			.where(where)
			.update(updates)
			.toString();

		client.query(text, function(err, result) {

			if (!result) {
				result = { rows: [] };
			}

			return callback(err, result);

		});

	};

};
