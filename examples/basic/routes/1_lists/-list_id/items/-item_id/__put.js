'use strict';

module.exports = function(db, lib, log) {

	return function(req, res) {

		var where = { 
			list_id: req.params.list_id,
			item_id: req.params.item_id
		};

		db.connect(function(client) {

			lib.items.update(client, where, req.body, function(err, result) {

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
