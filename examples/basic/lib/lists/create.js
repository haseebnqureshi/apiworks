'use strict';

module.exports = function(connection, db, values, callback /* (err, data) */ ) {

	db.lists.create(connection, values, function(err, data) {

		if (callback) {
			return callback(null, data.rows);
		}
		
	});

};
