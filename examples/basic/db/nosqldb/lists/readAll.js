'use strict';

module.exports = function(settings, express, app, log) {

	return function(client, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('lists', { primaryKey: 'list_id' });

		var rows = table.all();

		if (!rows) {
			rows = [];
		}

		return callback(null, {
			rows: rows
		});

	};

};
