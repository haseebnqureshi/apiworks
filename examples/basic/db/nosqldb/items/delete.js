'use strict';

var _ = require('underscore');

module.exports = function(settings, express, app, log) {

	return function(client, where, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		var table = client('items', { primaryKey: 'item_id' });

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
