'use strict';

module.exports = function(settings, express, app, log) {

	return function(client, where, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('items', { primaryKey: 'item_id' });

		var rows = table.where(where);

		if (!rows) {
			rows = [];
		}

		return callback(null, {
			rows: rows
		});

	};

};
