'use strict';

module.exports = function(settings, express, app, db, log) {

	return function(client, where, callback /* (err, result) */ ) {

		var callback = callback || function() {};

		db.items.read(client, where, callback);

	};

};
