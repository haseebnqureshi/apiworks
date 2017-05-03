'use strict';

module.exports = function(settings, express, app, db, lib, log) {

	return function(req, res, next) {

		log('cyan', '-- Middleware (home) --');

		next();

	};

};
