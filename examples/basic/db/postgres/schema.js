'use strict';

var connect = require('./connect.js');

module.exports = function(log) {

	connect(function(knex) {

		knex.schema.createTableIfNotExists('lists', function(table) {
			table.bigIncrements('list_id');
			table.string('list_name');
			table.timestamps();
		
		}).then(function(result) {
			return knex.schema.createTableIfNotExists('items', function(table) {
				table.bigIncrements('item_id');
				table.string('item_name');
				table.bigInteger('list_id').unsigned();
				table.foreign('list_id').references('lists.list_id')
				table.timestamps();
			});
		}).then(function() {


		}).catch(function(err) {
	
			log('red', err);
		
		});


	});

};
