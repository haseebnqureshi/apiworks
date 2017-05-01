'use strict';

var utils = require('./utils');

var packageJson = require('../package.json');

var log = utils.log;

module.exports = function(appDirname) {

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

	var dotenvPath = appDirname + '/.env';

	log('yellow', 'Loading config via dotenv...');

	log('gray', dotenvPath);

	require('dotenv').config({ path: dotenvPath });

	log('green', '...Done!');


	/* APIWORKS ENGINE */

	log('yellow', 'Loading apiworks engine...');

	var _ = require('underscore');

	var express = require('express');

	var read = require('fs-readdir-recursive');

	var bodyParser = require('body-parser');

	var pug = require('pug');

	var app = express();

	log('green', '...Done!');


	/* INSTANTIATING API */

	log('yellow', 'Instantiating application...');



	log('green', '...Done!');


	/* STARTING API */

	log('yellow', 'Starting application on port ' + (process.env.EXPRESS_PORT || 3000) + '...');

	app.listen(process.env.EXPRESS_PORT || 3000, function() {

		log('green', `...Done!`);

	});

};
