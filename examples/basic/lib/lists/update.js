'use strict';

module.exports = function(db) {

	return function(client, where, values, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.lists.update(client, where, values, callback);

	};

};
