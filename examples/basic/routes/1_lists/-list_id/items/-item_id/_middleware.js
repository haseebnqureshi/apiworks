'use strict';

module.exports = function(db, models, log) {

	return function(req, res, next) {

		log('cyan', '-- Middleware (item) --');

		next();

	};

};
