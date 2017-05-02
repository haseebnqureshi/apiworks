'use strict';

module.exports = function(callback /* client */) {

	var client = require('nosqldb');

	client.end = function() {};

	return callback(client);

};
