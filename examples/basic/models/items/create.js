'use strict';

module.exports = function(connection, db, values, callback /* (err, data) */ ) {

	db.items.create(connection, values, function(err, data) {

		if (callback) {
			return callback(null, data.rows);
		}
		
	});

};
