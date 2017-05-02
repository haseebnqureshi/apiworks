'use strict';

module.exports = function(db) {

	return function(client, where, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.lists.read(client, where, callback);

	};

};
