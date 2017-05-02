'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(client, where, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var text = knex('lists')
		.where(where)
		.returning('*')
		.toString();

	client.query(text, function(err, result) {

		if (!result) {
			result = { rows: [] };
		}

		return callback(err, result);

	});

};
