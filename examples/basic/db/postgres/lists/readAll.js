'use strict';

module.exports = function(connection, callback /* (err, data) */ ) {

	var table = connection('items');

	var rows = table.all();

	if (callback) {
		return callback(null, {
			rows: rows
		});
	}

};
