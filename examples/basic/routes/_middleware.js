'use strict';

module.exports = function(db, models, log) {

	return function(req, res, next) {


		db.connect(function(client) {
			console.log(client.toString());
		});


		log('cyan', '-- Middleware (home) --');

		next();

	};

};
