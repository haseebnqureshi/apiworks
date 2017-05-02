'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(client, where, updates, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var text = knex('lists')
		.where(where)
		.update(updates)
		.toString();

	client.query(text, function(err, result) {

		return callback(err, result);

	});

};
