'use strict';

var express = require('express');

var exec = require('child_process').execSync;

var app = express();

var utils = require('./utils');

var packageJson = require('../package.json');

var log = utils.log;

module.exports = function(settings) {

	var settings = settings || {};

	/* INFO */

	log('green', '| Welcome to your Apiworks application!', true);
	log('yellow', '| Version ' + packageJson.version, true);
	log('yellow', '| ' + packageJson.license + ' Licensed', true);
	log('gray', '| ', true);
	log('gray', '| It\'s very important to note what Apiworks is doing under the hood.', true);
	log('gray', '| It\'s a structured Express application that reads your application', true);
	log('gray', '| folder directory, looking for routes, middlewares, and render files.', true);
	log('gray', '| ', true);
	log('gray', '| The idea here, is whether you\'re crafting an API or an all-inclusive', true);
	log('gray', '| web app using Pug/Jade templates, you can clearly do that quickly and', true);
	log('gray', '| with incredible readability.', true);
	log('gray', '| ', true);
	log('cyan', '| Happy Coding!', true);
	log('gray', '| Haseeb Qureshi, Apiworks Author', true);
	log('gray', '| twitter.com/_hq, github.com/haseebnqureshi', true);
	log('gray', '| ', true);
	log('green', '| Now loading your application...', true);
	log('gray', '', true);

	/* CONFIG */

	var dotenvPath = settings.dirname + settings.dotenv;

	log('yellow', 'Loading config via dotenv...');

	log('gray', '   Loading from ' + dotenvPath);

	require('dotenv').config({ path: dotenvPath });

	log('green', '...Done!');


	/* INSTANTIATING API */

	log('yellow', 'Instantiating application...');

		log('yellow', '   Enabling request body and json...');

		app = require('./body.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Enabling static assets...');

		app = require('./static.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Enabling cors policy...');

		app = require('./cors.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Enabling preflight responses...');

		app = require('./preflight.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Enabling pug template rendering...');

		app = require('./pug.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Loading routes logger...');

		app = require('./routesLogger.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Loading database persistence layer...');

		var db = require('./db.js')(settings, express, app, log);

		log('green', '   ...Done!');


		log('yellow', '   Loading application library...');

		var lib = require('./lib.js')(settings, express, app, db, log);

		log('green', '   ...Done!');


		log('yellow', '   Loading routes...');

		app = require('./routes.js')(settings, express, app, db, lib, log);

		log('green', '   ...Done!');


	log('green', '...Done!');


	/* STARTING API */

	return require('./start.js')(settings, express, app, log);

};
