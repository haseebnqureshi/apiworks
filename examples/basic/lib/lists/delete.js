'use strict';

module.exports = function(settings, express, app, db, log) {

	return function(client, values, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.lists.delete(client, values, callback);

	};

};
