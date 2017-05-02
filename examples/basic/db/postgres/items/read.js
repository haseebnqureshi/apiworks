'use strict';

module.exports = function(connection, where, callback /* (err, data) */ ) {

	var table = connection('items');

	var row = table.findWhere(where);

	if (callback) {
		return callback(null, {
			rows: [row]
		});
	}

};
