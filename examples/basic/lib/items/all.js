'use strict';

module.exports = function(db) {

	return function(client, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.items.readAll(client, callback);

	};

};
