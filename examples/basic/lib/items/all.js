'use strict';

module.exports = function(db) {

	return function(connection, callback /* (err, data) */ ) {

		db.items.readAll(connection, function(err, data) {

			if (callback) {
				return callback(null, data.rows);
			}
			
		});

	};

};