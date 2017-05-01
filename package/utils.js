
'use strict';

var chalk = require('chalk');

var moment = require('moment');

module.exports.log = function(color, message, noTime) {

	var now = moment().format('ddd MMM DD YYYY HH:mm:ss:SSS');

	var time = chalk.gray('Apiworks: ' + now + ': ');

	var message = chalk[color](message);

	var line = noTime !== true ? time + message : message;

	console.log(line);

};
