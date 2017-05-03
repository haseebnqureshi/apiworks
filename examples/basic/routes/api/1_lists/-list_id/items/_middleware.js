'use strict';

module.exports = function(express, app, db, lib, log) {

	return function(req, res, next) {

		log('cyan', '-- Middleware (items) --');

		if (!req.params.list_id) { 
			return res.status(404).send({
				status: 404,
				data: []
			});
		}

		next();

	};

};
