'use strict';

module.exports = function(db) {

	return function(client, values, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.lists.create(client, values, callback);

	};

};
