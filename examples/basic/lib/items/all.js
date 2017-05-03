'use strict';

module.exports = function(settings, express, app, db, log) {

	return function(client, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.items.readAll(client, callback);

	};

};
