'use strict';

module.exports = function(settings, express, app, log) {

	return function(client, where, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('lists', { primaryKey: 'list_id' });

		var row = table.findWhere(where);

		table.delete(where);

		if (!row) {
			row = {};
		}

		return callback(null, {
			rows: [row]
		});

	};

};
