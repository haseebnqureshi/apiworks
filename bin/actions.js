'use strict';

var exec = require('child_process').execSync;

var fs = require('fs');

var _ = require('underscore');

var mustache = require('mustache');

module.exports = {

	addExtra: function(name, from, to) {
		exec(`cp -r ${from} ${to}`, { stdio: [] });

		//adding our necessary main entry file hooks for our extra
		var main = fs.readFileSync(`${to}/index.js`, 'utf8');
		var data = require(`${to}/${name}/install.json`);
		var rendered = mustache.render(main, data);
		fs.writeFileSync(`${to}/index.js`, rendered, 'utf8');

		//adding some needed deps
		exec(`bash ${to}/${name}/install.sh`, { stdio: [] });

		//cleaning up
		exec(`rm ${to}/${name}/install.sh`, { stdio: [] });
		exec(`rm ${to}/${name}/install.json`, { stdio: [] });
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
