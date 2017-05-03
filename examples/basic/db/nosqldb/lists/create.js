'use strict';

module.exports = function(settings, express, app, log) {

	return function(client, values, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('lists', { primaryKey: 'list_id' });

		table.create(values);

		var row = table.findWhere(values);

		if (!row) {
			row = {};
		}

		return callback(null, {
			rows: [row]
		});

	};

};
