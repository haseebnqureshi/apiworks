'use strict';

var exec = require('child_process').execSync;

var fs = require('fs');

var _ = require('underscore');

module.exports = {

	addExtra: function(name, from, to) {
		exec(`cp -r ${from} ${to}`, { stdio: [] });
		exec(`bash ${to}/${name}/install.sh`, { stdio: [] });
		exec(`rm ${to}/${name}/install.sh`, { stdio: [] });
	},

	copyDir: function(from, to) {
		return exec(`cp -r ${from} ${to}`, {
			stdio: []
		});
	},

	npmInstall: function(dirpath) {
		return exec(`cd ${dirpath} && npm install`, {
			stdio: []
		});
	},

	readdir: function(dirpath) {
		return _.filter(fs.readdirSync(dirpath), function(filename) {
			return !filename.match(/^\./);
		});
	}

};
