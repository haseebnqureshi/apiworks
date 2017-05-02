'use strict';

module.exports = function(client, values, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var table = client('items', { primaryKey: 'item_id' });

	table.create(values);

	var row = table.findWhere(values);

	if (!row) {
		row = {};
	}

	return callback(null, {
		rows: [row]
	});

};
