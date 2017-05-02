'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(client, where, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var text = knex('items')
		.where(where)
		.returning('*')
		.toString();

	client.query(text, function(err, result) {

		return callback(err, result);

	});

};
