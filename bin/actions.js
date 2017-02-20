'use strict';

var exec = require('child_process').execSync;

module.exports = {

	copyDir: function(from, to) {
		return exec(`cp -r ${from} ${to}`, {
			stdio: []
		});
	},

	npmInstall: function(dirpath) {
		return exec(`cd ${dirpath} && npm install`, {
			stdio: []
		});
	}

};
