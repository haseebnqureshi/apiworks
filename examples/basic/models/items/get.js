'use strict';

module.exports = function(connection, db, where, callback /* (err, data) */ ) {

	db.items.read(connection, where, function(err, data) {

		if (callback) {
			return callback(null, data.rows);
		}
		
	});

};
