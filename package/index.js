'use strict';

var utils = require('./utils');

var packageJson = require('../package.json');

var log = utils.log;

module.exports = function(options) {

	var options = options || {};

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

	var dotenvPath = options.dirname + options.dotenv;

	log('yellow', 'Loading config via dotenv...');

	log('gray', dotenvPath);

	require('dotenv').config({ path: dotenvPath });

	log('green', '...Done!');


	/* APIWORKS ENGINE */

	log('yellow', 'Loading apiworks engine...');

	var _ = require('underscore');

	var express = require('express');

	var pug = require('pug');

	var app = express();

	log('green', '...Done!');


	/* INSTANTIATING API */

	log('yellow', 'Instantiating application...');

		log('yellow', '   Loading database persistence layer...');

		var db = require('./db.js')(options);

		log('green', '   ...Done!');


		log('yellow', '   Loading models abstraction layer...');

		var models = require('./models.js')(options);

		log('green', '   ...Done!');


		log('yellow', '   Enabling static assets...');

		app = require('./static.js')(app, express, options);

		log('green', '   ...Done!');


		log('yellow', '   Enabling body parser and json...');

		app = require('./body.js')(app, express, options);

		log('green', '   ...Done!');


		log('yellow', '   Loading routes logger...');

		app = require('./routesLogger.js')(app, express, options, log);

		log('green', '   ...Done!');


		log('yellow', '   Loading routes...');

		app = require('./routes.js')(app, express, db, models, options, log);

		log('green', '   ...Done!');


	log('green', '...Done!');


	/* STARTING API */

	log('yellow', 'Starting application on port ' + (process.env.EXPRESS_PORT || 3000) + '...');

	app.listen(process.env.EXPRESS_PORT || 3000, function() {

		log('green', `...Done!`);

	});

};
