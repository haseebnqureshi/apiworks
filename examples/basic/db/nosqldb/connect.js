'use strict';

module.exports = function(callback /* connection */ ) {

	var connection = require('nosqldb');

	return callback(connection);

};
