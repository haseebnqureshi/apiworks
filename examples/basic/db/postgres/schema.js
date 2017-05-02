'use strict';

var connect = require('./connect.js');

var knex = require('knex')({ client: 'pg' });

module.exports = function(log) {

	connect(function(client) {
		
		var lists = knex.schema.createTableIfNotExists('lists', function(table) {
			table.bigIncrements('list_id');
			table.string('list_name');
			table.timestamps();
		}).toString();

		var items = knex.schema.createTableIfNotExists('items', function(table) {
			table.bigIncrements('item_id');
			table.string('item_name');
			table.bigInteger('list_id').unsigned();
			table.foreign('list_id').references('lists.list_id')
			table.timestamps();
		}).toString();

		var text = [lists, items].join("; ");

		client.query(text, function(err, result) {

			if (err) {

				if (err.toString().match('constraint')) { return; }

				log('red', err);

				return;

			}

			log('green', 'Database schema created!');

		});
	
	});

};
