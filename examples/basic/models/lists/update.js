'use strict';

module.exports = function(connection, db, where, values, callback /* (err, data) */ ) {

	db.lists.update(connection, where, values, function(err, data) {

		if (callback) {
			return callback(null, data.rows);
		}
		
	});

};