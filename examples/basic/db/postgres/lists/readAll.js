'use strict';

var knex = require('knex')({ client: 'pg' });

module.exports = function(client, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var text = knex
		.select('*')
		.from('lists')
		.toString();

	client.query(text, function(err, result) {

		return callback(err, result);

	});

};
