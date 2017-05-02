'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(client, values, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var text = knex('lists')
		.insert(values)
		.returning('*')
		.toString();

	client.query(text, function(err, result) {

		return callback(err, result);

	});

};
