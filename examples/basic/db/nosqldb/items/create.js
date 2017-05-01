'use strict';

module.exports = function(connection, values, callback /* (err, data) */ ) {

	var table = connection('items');

	table.create(values);

	var row = table.findWhere(values);

	if (callback) {
		return callback(null, {
			rows: [row]
		});
	}

};
