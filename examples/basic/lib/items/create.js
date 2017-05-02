'use strict';

module.exports = function(db) {

	return function(connection, values, callback /* (err, data) */ ) {

		db.items.create(connection, values, function(err, data) {

			if (callback) {
				return callback(null, data.rows);
			}
			
		});

	};

};
