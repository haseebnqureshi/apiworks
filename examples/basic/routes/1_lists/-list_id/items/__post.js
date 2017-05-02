'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		console.log(req.params, req.body);

		req.body.list_id = parseInt(req.params.list_id);

		// if (!req.body.list_id) { 
		// 	return res.status(404).send({
		// 		status: 404,
		// 		data: []
		// 	});
		// }

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
