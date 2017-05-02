'use strict';

module.exports = function(db) {

	return function(connection, where, callback /* (err, data) */ ) {

		db.items.delete(connection, where, function(err, data) {

			if (callback) {
				return callback(null, data.rows);
			}
			
		});

	};

};
