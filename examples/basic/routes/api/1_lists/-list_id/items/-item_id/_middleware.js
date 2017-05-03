'use strict';

module.exports = function(express, app, db, lib, log) {

	return function(req, res, next) {

		log('cyan', '-- Middleware (item) --');

		next();

	};

};
