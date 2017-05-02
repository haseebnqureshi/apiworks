'use strict';

module.exports = function(connection, where, updates, callback /* (err, data) */ ) {

	var table = connection('items');

	table.update(where, updates);

	var row = table.findWhere(where);

	if (callback) {
		return callback(null, {
			rows: [row]
		});
	}

};
