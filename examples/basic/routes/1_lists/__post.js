'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		db.connect(function(client) {

			lib.lists.create(client, req.body, function(err, result) {

				var status = 200;
				var data = result.rows;

				if (err) {
					status = 500;
				}

				return res.status(status).send({
					status: status,
					data: data
				});

			});

		});

	};

};
