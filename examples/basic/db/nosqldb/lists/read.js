'use strict';

module.exports = function(client, where, callback /* (err, result) */ ) {

	var callback = callback || function() {};

	var table = client('lists', { primaryKey: 'list_id' });

	var rows = table.where(where);

	if (!rows) {
		rows = [];
	}

	return callback(null, {
		rows: rows
	});

};
