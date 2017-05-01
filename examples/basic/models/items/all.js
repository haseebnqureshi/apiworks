'use strict';

module.exports = function(connection, db, callback /* (err, data) */ ) {

	db.items.readAll(connection, function(err, data) {

		if (callback) {
			return callback(null, data.rows);
		}
		
	});

};
