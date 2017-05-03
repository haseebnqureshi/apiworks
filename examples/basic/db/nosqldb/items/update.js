'use strict';

module.exports = function(settings, express, app, log) {

	return function(client, where, updates, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('items', { primaryKey: 'item_id' });

		table.update(where, updates);

		var row = table.findWhere(where);

		if (!row) {
			row = {};
		}

		return callback(null, {
			rows: [row]
		});

	};

};
