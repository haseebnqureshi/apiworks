'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		req.body.list_id = req.params.list_id;

		db.connect(function(client) {

			lib.items.create(client, req.body, function(err, result) {

				console.log({ err, result });

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
