
'use strict';

var chalk = require('chalk');

var moment = require('moment');

module.exports.log = function(color, message) {

	var now = moment().format('ddd MMM DD YYYY HH:mm:ss:SSS');

	var message = chalk.gray(`Apiworks: ${now}: `) + chalk[color](message);

	console.log(message);

};
