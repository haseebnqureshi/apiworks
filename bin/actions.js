'use strict';

var exec = require('child_process').execSync;

module.exports = {

	copyDir: function(from, to) {
		return exec(`cp -r ${from} ${to}`, {
			stdio: []
		});
	}

};
