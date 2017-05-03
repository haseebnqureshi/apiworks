'use strict';

module.exports = function(express, app, db, lib, log) {

	return function(req, res) {

		db.connect(function(client) {

			lib.lists.all(client, function(err, result) {

				var status = 200;
				var data = result.rows;

				if (err) {
					status = 500;
				}

				if (data.length === 0) {
					status = 404;
				}

				return res.status(status).send({
					status: status,
					data: data
				});

			});

		});

	};

};
