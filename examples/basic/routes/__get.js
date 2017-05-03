'use strict';

module.exports = function(express, app, db, lib, log) {

	return function(req, res) {

		db.connect(function(client) {

			lib.lists.all(client, function(err, listResults) {

				lib.items.all(client, function(err, itemResults) {

					client.end();

					var data = { 
						lists: listResults.rows,
						items: itemResults.rows
					};

					var pugFilepath = __dirname + '/render.pug';

					return res.render(pugFilepath, data);

				});

			});

		}, false);

	};

};
