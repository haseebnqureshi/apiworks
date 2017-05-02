'use strict';

module.exports = function(db, lib, log) {

	return function(req, res, next) {

		log('cyan', '-- Middleware (list) --');

		next();

	};

};
